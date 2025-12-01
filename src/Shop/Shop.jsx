import { useEffect } from "react";

export default function Shop() {
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products/category-list", {
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchProducts();
  }, []);

  return <div>This is the shop page.</div>;
}
