import { formatDate } from "./../../../../../utilities.js";
import styles from "./Review.module.css";

export default function Review({ review }) {
  const { reviewerName, date, rating, comment } = review;

  return (
    <li className={styles.gridContainer}>
      <div className={styles.container}>
        <span aria-hidden="true" className="material-symbols-rounded">
          account_circle
        </span>
        <p>{reviewerName}</p>
        <p>{formatDate(date)}</p>
        <p className={styles.rating}>
          {`${rating}/5.0`}
          <span aria-hidden="true" className="material-symbols-rounded">
            star_rate
          </span>
        </p>
      </div>
      <p>{comment}</p>
    </li>
  );
}
