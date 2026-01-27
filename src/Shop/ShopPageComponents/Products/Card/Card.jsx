import styles from "./Card.module.css";

export default function Card({ title, thumbnail, price, rating, onClick }) {
  return (
    <li className={styles.gridContainer} onClick={onClick}>
      <p className={styles.rating}>
        {`${rating}/5.0`}
        <span aria-hidden="true" className="material-symbols-rounded">
          star_rate
        </span>
      </p>
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>
      <h3>{title}</h3>
      <p>{`$${price}`}</p>
    </li>
  );
}
