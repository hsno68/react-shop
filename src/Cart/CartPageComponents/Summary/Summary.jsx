import { useOutletContext, Link } from "react-router-dom";
import { getSubtotal } from "../../../utilities.js";
import styles from "./Summary.module.css";

const SHIPPING_COST = 5.99;
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 35;

export default function Summary({ page }) {
  const { products, cart } = useOutletContext();

  const subtotal = getSubtotal(cart, products);
  const tax = subtotal * TAX_RATE;

  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingText = freeShipping ? "Free" : `$${SHIPPING_COST}`;

  const total = subtotal + tax + (freeShipping ? 0 : SHIPPING_COST);

  if (Object.keys(cart).length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>Summary</h2>
      <div className={styles.lineItem}>
        <p>Subtotal</p>
        <span aria-hidden="true" className={styles.dots}></span>
        <p>{`$${subtotal.toFixed(2)}`}</p>
      </div>
      <div className={styles.lineItem}>
        <p>Tax</p>
        <span aria-hidden="true" className={styles.dots}></span>
        <p>{`$${tax.toFixed(2)}`}</p>
      </div>
      <div className={styles.lineItem}>
        <p>Shipping</p>
        <span aria-hidden="true" className={styles.dots}></span>
        <p>{shippingText}</p>
      </div>
      <div className={styles.shippingWrapper}>
        <small className={styles.shipping}>
          {freeShipping
            ? "This purchase qualifies for free shipping."
            : `Free shipping on orders over $${FREE_SHIPPING_THRESHOLD}`}
        </small>
      </div>
      <p className={styles.total}>{`Total: $${total.toFixed(2)}`}</p>
      {page === "cart" ? (
        <Link to="/checkout" className={styles.button}>
          Proceed to Checkout
        </Link>
      ) : (
        <button className={`${styles.button} ${styles.pay}`}>Complete Purchase</button>
      )}
    </div>
  );
}
