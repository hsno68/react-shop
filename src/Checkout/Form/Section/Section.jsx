import { input } from "@testing-library/user-event/dist/cjs/event/input.js";
import Control from "./Control/Control.jsx";

export default function Section({ heading, controls }) {
  const sectionHeading = heading[0].toUpperCase() + heading.slice(1);

  return (
    <section aria-labelledby={heading}>
      <h2 id={heading}>{sectionHeading}</h2>
      {controls.map(({ type, label, id, required }) => (
        <Control key={id} type={type} label={label} id={id} required={required} />
      ))}
    </section>
  );
}
