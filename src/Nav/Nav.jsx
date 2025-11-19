import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <Link to="/homepage" className="link">
        Homepage
      </Link>
      <Link to="/products" className="link">
        Products
      </Link>
      <Link to="/cart" className="link">
        Cart
      </Link>
    </div>
  );
}
