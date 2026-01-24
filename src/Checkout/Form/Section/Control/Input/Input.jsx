import { useOutletContext } from "react-router-dom";

export default function Input({ type, id, required }) {
  const { formData, setFormData } = useOutletContext();

  return (
    <input
      type={type}
      id={id}
      value={formData[id]}
      required={required}
      onChange={(e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
      }}
    />
  );
}
