import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav.jsx";

export default function App() {
  const [carouselImages, setCarouselImages] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [categories, setCategories] = useState({});
  const [categoriesCache, setCategoriesCache] = useState({});
  const [filters, setFilters] = useState({ mainCategories: [], subCategories: {} });

  const [products, setProducts] = useState(() =>
    JSON.parse(localStorage.getItem("products") || "{}")
  );

  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "{}"));

  function toggleMainCategoryFilter({ mainCategory }) {
    setFilters((prevFilters) => {
      const prevMainCategories = prevFilters.mainCategories;

      if (!prevMainCategories.includes(mainCategory)) {
        return {
          ...prevFilters,
          mainCategories: [...prevMainCategories, mainCategory],
        };
      }

      return {
        ...prevFilters,
        mainCategories: prevMainCategories.filter((category) => category !== mainCategory),
      };
    });
  }

  function toggleSubcategoryFilter({ mainCategory, subCategory }) {
    setFilters((prevFilters) => {
      const prevSubcategories = prevFilters.subCategories;

      if (!Object.hasOwn(prevSubcategories, mainCategory)) {
        return {
          ...prevFilters,
          subCategories: { ...prevSubcategories, [mainCategory]: [subCategory] },
        };
      }

      const listOfSubcategories = prevSubcategories[mainCategory];

      if (!listOfSubcategories.includes(subCategory)) {
        return {
          ...prevFilters,
          subCategories: {
            ...prevSubcategories,
            [mainCategory]: [...listOfSubcategories, subCategory],
          },
        };
      }

      return {
        ...prevFilters,
        subCategories: {
          ...prevSubcategories,
          [mainCategory]: listOfSubcategories.filter((category) => category !== subCategory),
        },
      };
    });
  }

  function clearFilters() {
    setFilters((prevFilters) => ({ ...prevFilters, subCategories: {} }));
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("products", JSON.stringify(products));
  }, [products, cart]);

  return (
    <div className="app">
      <Nav cart={cart} />
      <Outlet
        context={{
          carouselImages,
          setCarouselImages,
          searchValue,
          setSearchValue,
          sortValue,
          setSortValue,
          categories,
          setCategories,
          categoriesCache,
          setCategoriesCache,
          products,
          setProducts,
          cart,
          setCart,
          filters,
          setFilters,
          toggleMainCategoryFilter,
          toggleSubcategoryFilter,
          clearFilters,
        }}
      />
    </div>
  );
}

/* Example filters structure

  filters = {
    mainCategories: ["Electronics", "Apparel"],
    subCategories: {
      Electronics: ["laptops", "smartphones"],
      Apparel: ["mens-shirts", "womens-dresses"]
    }

*/

/* Example categories cache structure

  categoriesCache = {
    laptops: [1, 2, 3, 4...],
    sunglasses: [12, 13, 14, 15, ...],
    beauty: [60, 61, 62, ...],
  }

*/

/* Example products cache structure

  products = {
    1: { id: 1, title: ...},
    2: { id: 2, title: ...},
    3: { id: 3, title: ...},
  };

*/

/* Example cart structure

cart = {
  1: 1,
  8: 2,
  9: 1
}

[id]: quantity

*/
