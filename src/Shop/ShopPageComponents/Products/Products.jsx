import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "./Card/Card.jsx";
import Modal from "./Modal/Modal.jsx";
import styles from "./Products.module.css";

export default function Products() {
  const {
    categoriesCache,
    setCategoriesCache,
    products,
    setProducts,
    filters,
    searchValue,
    sortValue,
  } = useOutletContext();

  const [searchResults, setSearchResults] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  const subCategories = Object.values(filters.subCategories).flat();

  //Categories fetch
  useEffect(() => {
    const cachedSubcategories = Object.keys(categoriesCache);

    const newSubcategories = subCategories.filter(
      (subCategory) => !cachedSubcategories.includes(subCategory)
    );

    if (!newSubcategories.length) {
      return;
    }

    async function fetchProducts() {
      try {
        const data = await Promise.all(
          newSubcategories.map(async (subCategory) => {
            const response = await fetch(`https://dummyjson.com/products/category/${subCategory}`, {
              mode: "cors",
            });

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const json = await response.json();
            return { subCategory, products: json.products };
          })
        );

        setCategoriesCache((prevCategoriesCache) => {
          const newCategories = data.reduce((accumulator, { subCategory, products }) => {
            accumulator[subCategory] = products.map((product) => product.id);
            return accumulator;
          }, {});

          return { ...prevCategoriesCache, ...newCategories };
        });

        setProducts((prevProducts) => {
          const allProducts = data.flatMap(({ products }) => products);
          return mergeProducts(prevProducts, allProducts);
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [filters.subCategories]);

  //Search fetch
  useEffect(() => {
    const search = searchValue.trim();

    if (!search) {
      setSearchResults([]);
      return;
    }

    if (subCategories.length) {
      return;
    }

    const controller = new AbortController();

    const fetchTimeout = setTimeout(() => {
      async function fetchProducts() {
        try {
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=0`,
            {
              mode: "cors",
              signal: controller.signal,
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          setSearchResults(data.products.map(({ id }) => id));
          setProducts((prevProducts) => mergeProducts(prevProducts, data.products));
        } catch (error) {
          if (error.name === "AbortError") {
            return;
          }
          console.error("Error fetching products:", error);
        }
      }

      fetchProducts();
    }, 300);

    return () => {
      clearTimeout(fetchTimeout);
      controller.abort();
    };
  }, [searchValue, filters.subCategories]);

  function mergeProducts(prevProducts, productsArray) {
    const newProducts = productsArray.reduce((accumulator, product) => {
      const { id } = product;
      accumulator[id] = product;
      return accumulator;
    }, {});

    return { ...prevProducts, ...newProducts };
  }

  function getListOfProducts() {
    let productIds = subCategories.length
      ? subCategories.flatMap((subCategory) => categoriesCache[subCategory] ?? [])
      : searchResults;

    const search = searchValue.trim().toLowerCase();

    if (search && subCategories.length) {
      productIds = productIds.filter((id) => {
        const product = products[id];

        const props = ["title", "description", "brand", "tags"];

        return props.some((prop) => {
          const value = product[prop];

          if (Array.isArray(value)) {
            return value.some((v) => v.toLowerCase().includes(search));
          }

          return String(value).toLowerCase().includes(search);
        });
      });
    }

    if (sortValue) {
      productIds = sortProducts(productIds);
    }

    return productIds;
  }

  function sortProducts(products) {
    const comparators = {
      ratingDesc: (a, b) => products[b].rating - products[a].rating,
      priceAsc: (a, b) => products[a].price - products[b].price,
      priceDesc: (a, b) => products[b].price - products[a].price,
      titleAsc: (a, b) => products[a].title.localeCompare(products[b].title),
      titleDesc: (a, b) => products[b].title.localeCompare(products[a].title),
    };

    const comparator = comparators[sortValue];

    if (!comparator) {
      return products;
    }

    return [...products].sort(comparator);
  }

  return (
    <div className={styles.container}>
      {subCategories.length === 0 && searchResults.length === 0 ? (
        <h2>Choose a category or search to view products.</h2>
      ) : (
        <ul className={styles.gridContainer}>
          {getListOfProducts().map((productId) => {
            const product = products[productId];

            const { id, title, thumbnail, price } = product;

            return (
              <Card
                key={id}
                title={title}
                thumbnail={thumbnail}
                price={price}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProduct(product);
                }}
              />
            );
          })}
        </ul>
      )}
      {activeProduct && <Modal product={activeProduct} closeModal={() => setActiveProduct(null)} />}
    </div>
  );
}

/* Example fetched data return
[
  {
    subCategory: "laptops",
    products: [...]
  },

  {
    subCategory: "phones",
    products: [...]
  },
]
*/
