import styles from "./Card.module.css";

export default function Card({ id, title, thumbnail, price, quantity, onCartChange }) {
  return (
    <li className={styles.gridContainer}>
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p>{`$${price}`}</p>
      <div className={styles.quantityControls}>
        <p>Qty:</p>
        <div className={styles.quantityButtons}>
          <button
            type="button"
            aria-label="Increase quantity"
            className={styles.button}
            onClick={() => onCartChange({ id, mode: "subtract" })}
            disabled={quantity === 1}
          >
            <span aria-hidden="true" className="material-symbols-rounded">
              remove
            </span>
          </button>
          <p className={styles.quantity}>{`${quantity}`}</p>
          <button
            type="button"
            aria-label="Decrease quantity"
            className={styles.button}
            onClick={() => onCartChange({ id, mode: "add" })}
          >
            <span aria-hidden="true" className="material-symbols-rounded">
              add
            </span>
          </button>
        </div>
        <button type="button" onClick={() => onCartChange({ id, mode: "delete" })}>
          Delete
        </button>
      </div>
      <p className={styles.total}>{`Total: $${(price * quantity).toFixed(2)}`}</p>
    </li>
  );
}
