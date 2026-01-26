import Items from "./CartPageComponents/Items/Items.jsx";
import Summary from "./CartPageComponents/Summary/Summary.jsx";
import styles from "./Cart.module.css";

export default function Cart() {
  return (
    <div className={styles.gridContainer}>
      <h1>Shopping Cart</h1>
      <Items page={"cart"} />
      <Summary page={"cart"} />
    </div>
  );
}
