import styles from "./Nav.module.css";

export default function Nav({ slidesCount, navIndex, navigate }) {
  const indicators = [];

  for (let i = 0; i < slidesCount; i++) {
    indicators.push(
      <button
        key={i}
        type="button"
        className={`${styles.navButton} ${navIndex === i && styles.selected}`}
        onClick={() => navigate({ index: i })}
      ></button>
    );
  }

  return <div className={styles.container}>{indicators}</div>;
}
