import styles from "./Card.module.css";

export default function Card({ title, thumbnail, price, onClick }) {
  return (
    <li className={styles.gridContainer} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>
      <h3>{title}</h3>
      <p>{`$${price}`}</p>
    </li>
  );
}
