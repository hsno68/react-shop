import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";

export default function Categories() {
  const { setFilters } = useOutletContext();
  const navigate = useNavigate();

  function navigateToShop({ mainCategory, subCategories }) {
    setFilters({
      mainCategories: [mainCategory],
      subCategories: { [mainCategory]: [...subCategories] },
    });
    navigate("/shop");
  }

  return (
    <div className={styles.container}>
      <h2>Featured Categories</h2>
      <ul className={styles.gridContainer}>
        {categories.map(({ mainCategory, subCategories }) => (
          <li key={mainCategory}>
            <button
              type="button"
              className={styles.button}
              onClick={() => navigateToShop({ mainCategory, subCategories })}
            >
              {mainCategory}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const categories = [
  {
    mainCategory: "Electronics",
    subCategories: ["laptops", "mobile-accessories", "smartphones", "tablets"],
  },
  {
    mainCategory: "Apparel",
    subCategories: [
      "mens-shirts",
      "mens-shoes",
      "tops",
      "womens-bags",
      "womens-dresses",
      "womens-shoes",
    ],
  },
  {
    mainCategory: "Home",
    subCategories: ["furniture", "home-decoration", "kitchen-accessories"],
  },
  {
    mainCategory: "Beauty",
    subCategories: ["beauty", "fragrances", "skin-care"],
  },
];
