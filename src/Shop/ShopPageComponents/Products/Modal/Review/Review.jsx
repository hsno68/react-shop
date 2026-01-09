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
        <p className={styles.rating}>
          <span aria-hidden="true" className="material-symbols-rounded">
            star_rate
          </span>
          {`${rating.toFixed(1)} / 5.0`}
        </p>
      </div>
      <p className={styles.date}>{formatDate(date)}</p>
      <p className={styles.comment}>{comment}</p>
    </li>
  );
}
