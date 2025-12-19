import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "./Card/Card.jsx";
import styles from "./Products.module.css";

export default function Products() {
  const { products, setProducts, filters } = useOutletContext();

  const cachedSubcategories = Object.keys(products);
  const subCategories = Object.values(filters.subCategories).flat();

  useEffect(() => {
    const subCategory = subCategories.find(
      (subCategory) => !cachedSubcategories.includes(subCategory)
    );

    if (!subCategory) {
      return;
    }

    async function fetchProducts() {
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${subCategory}`, {
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        setProducts((prevProducts) => ({ ...prevProducts, [subCategory]: data.products }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [filters.subCategories]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      {subCategories.length === 0 ? (
        <h2>Choose a category or search to view products.</h2>
      ) : (
        <ul className={styles.gridContainer}>
          {subCategories
            .flatMap((subCategory) => products[subCategory] ?? [])
            .map((product) => (
              <Card key={product.id} product={product} />
            ))}
        </ul>
      )}
    </div>
  );
}
