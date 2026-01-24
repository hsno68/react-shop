import { useOutletContext } from "react-router-dom";
import styles from "./Input.module.css";

export default function Input({ type, id, required }) {
  const { formData, setFormData } = useOutletContext();

  return (
    <input
      type={type}
      id={id}
      value={formData[id]}
      required={required}
      className={styles.input}
      onChange={(e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
      }}
    />
  );
}
