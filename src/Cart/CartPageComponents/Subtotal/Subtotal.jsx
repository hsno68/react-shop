import { useOutletContext } from "react-router-dom";
import { getSubtotal } from "../../../utilities.js";
import styles from "./Subtotal.module.css";

const SHIPPING_COST = 5.99;
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 35;

export default function Subtotal() {
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
      <div className={styles.summary}>
        <h2>Summary</h2>
        <p>{`Subtotal: $${subtotal.toFixed(2)}`}</p>
        <p>{`Tax: $${tax.toFixed(2)}`}</p>
        <p>{`Shipping: ${shippingText}`}</p>
        {!freeShipping && (
          <small
            className={styles.shipping}
          >{`Free shipping on orders over $${FREE_SHIPPING_THRESHOLD}`}</small>
        )}
        <hr />
        <p className={styles.total}>{`Total: $${total.toFixed(2)}`}</p>
        <button type="button">Proceed to checkout</button>
      </div>
    </div>
  );
}
