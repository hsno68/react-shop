import { Link } from "react-router-dom";
import Form from "./Form/Form.jsx";
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
      <Summary />
    </div>
  );
}
