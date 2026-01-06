import styles from "./Card.module.css";

export default function Card({ icon, title, desc }) {
  return (
    <li className={styles.gridContainer}>
      <span aria-hidden="true" className="material-symbols-rounded">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </li>
  );
}
