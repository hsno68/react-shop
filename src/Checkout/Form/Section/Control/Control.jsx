import Input from "./Input/Input.jsx";
import Select from "./Select/Select.jsx";
import styles from "./Control.module.css";

const inputs = ["text", "tel", "email", "date", "checkbox"];

const controls = Object.fromEntries(
  inputs.map((input) => [input, (props) => <Input type={input} {...props} />])
);

const types = {
  ...controls,
  select: (props) => <Select {...props} />,
};

export default function Control({ section, type, label, id, required, checked }) {
  const props = {
    section,
    id,
    required,
    checked,
  };

  const control = types[type](props);

  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        <span aria-hidden="true">{required && "*"}</span>
        {label}
      </label>
      {control}
    </div>
  );
}
