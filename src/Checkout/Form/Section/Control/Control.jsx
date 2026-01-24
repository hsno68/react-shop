import Input from "./Input/Input.jsx";
import Select from "./Select/Select.jsx";

const inputs = ["text", "tel", "email", "date"];

const controls = Object.fromEntries(
  inputs.map((input) => [input, (props) => <Input type={input} {...props} />])
);

const types = {
  ...controls,
  select: (props) => <Select {...props} />,
};

export default function Control({ type, label, id, required }) {
  const props = {
    id,
    required,
  };

  const control = types[type](props);

  return (
    <div className="form-control-container">
      <label htmlFor={id}>
        <span aria-hidden="true">{required && "*"}</span>
        {label}
      </label>
      {control}
    </div>
  );
}
