import { Link } from "react-router-dom";
import Form from "./Form/Form.jsx";
import Items from "../Cart/CartPageComponents/Items/Items.jsx";
import Summary from "../Cart/CartPageComponents/Summary/Summary.jsx";
import styles from "./Checkout.module.css";

export default function Checkout() {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.heading}>
        <h1>Checkout</h1>
        <Link to="/cart" className="link">
          Back to Cart
        </Link>
      </div>
      <Form />
      <Items page={"checkout"} />
      <Summary page={"checkout"} />
    </div>
  );
}
