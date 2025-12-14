import { useOutletContext } from "react-router-dom";
import styles from "./Subcategories.module.css";

export default function Subcategories({ mainCategory, items }) {
  const { filters, toggleSubcategoryFilter } = useOutletContext();

  return (
    <ul className={styles.container}>
      {items.map((subCategory) => (
        <li key={subCategory}>
          <input
            type="checkbox"
            id={subCategory}
            checked={filters.subCategories[mainCategory]?.includes(subCategory) || false}
            onChange={() => toggleSubcategoryFilter({ mainCategory, subCategory })}
          />
          <label htmlFor={subCategory}>{formatCategory(subCategory)}</label>
        </li>
      ))}
    </ul>
  );
}

function formatCategory(category) {
  return category
    .split("-")
    .map((string) => {
      let resultString = string[0].toUpperCase() + string.slice(1);
      if (resultString.endsWith("ens")) {
        resultString = `${resultString.substring(0, resultString.length - 1)}'s`;
      }
      return resultString;
    })
    .join(" ");
}
