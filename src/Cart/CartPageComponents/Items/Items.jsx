import { useOutletContext, Link } from "react-router-dom";
import { getSubtotal } from "../../../utilities.js";
import Card from "./Card/Card.jsx";
import styles from "./Items.module.css";

export default function Items({ page }) {
  const { products, cart, setCart } = useOutletContext();

  const isCartEmpty = Object.keys(cart).length === 0;

  function onCartChange({ id, mode }) {
    setCart((prevCart) => {
      if (mode === "delete") {
        const { [id]: deleted, ...restOfCart } = prevCart;
        return restOfCart;
      }

      return {
        ...prevCart,
        [id]: prevCart[id] + (mode === "add" ? 1 : -1),
      };
    });
  }

  return (
    <div
      className={`${styles.container} ${page === "cart" ? styles.cartPage : styles.checkoutPage} ${isCartEmpty ? styles.fullWidth : ""}`}
    >
      {isCartEmpty ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/shop" className="link">
            Browse products in the Shop
          </Link>{" "}
          to add items.
        </p>
      ) : (
        <>
          <ul className={styles.itemsList}>
            {Object.entries(cart).map(([id, quantity]) => {
              const product = products[id];
              const { title, thumbnail, price } = product;

              return (
                <Card
                  key={id}
                  page={page}
                  id={id}
                  title={title}
                  thumbnail={thumbnail}
                  price={price}
                  quantity={quantity}
                  onCartChange={onCartChange}
                />
              );
            })}
          </ul>
          <p
            className={styles.subtotal}
          >{`Subtotal: $${getSubtotal(cart, products).toFixed(2)}`}</p>
        </>
      )}
    </div>
  );
}
