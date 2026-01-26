import Control from "./Control/Control.jsx";
import styles from "./Section.module.css";

export default function Section({ heading, controls }) {
  const sectionHeading = heading[0].toUpperCase() + heading.slice(1);

  return (
    <section aria-labelledby={heading} className={styles.section}>
      <h2 id={heading}>{sectionHeading}</h2>
      {controls.map(({ type, label, id, required }) => (
        <Control key={id} section={heading} type={type} label={label} id={id} required={required} />
      ))}
    </section>
  );
}
