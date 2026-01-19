import styles from "./Card.module.css";

export default function Card({ title, thumbnail, price, quantity }) {
  return (
    <li className={styles.gridContainer}>
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>{`$${price}`}</p>
      <div className={styles.quantityControls}>
        <p>Qty:</p>
        <div className={styles.quantityButtons}>
          <button
            type="button"
            aria-label="Increase quantity"
            className={styles.button}
            disabled={quantity === 1}
          >
            <span aria-hidden="true" className="material-symbols-rounded">
              remove
            </span>
          </button>
          <p className={styles.quantity}>{`${quantity}`}</p>
          <button type="button" aria-label="Decrease quantity" className={styles.button}>
            <span aria-hidden="true" className="material-symbols-rounded">
              add
            </span>
          </button>
        </div>
        <button type="button">Delete</button>
      </div>
      <p className={styles.total}>{`Total: $${(price * quantity).toFixed(2)}`}</p>
    </li>
  );
}
