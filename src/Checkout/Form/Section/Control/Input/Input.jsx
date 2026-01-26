import { useOutletContext } from "react-router-dom";
import styles from "./Input.module.css";

export default function Input({ section, type, id, required }) {
  const { formData, setFormData } = useOutletContext();

  const isCheckbox = type === "checkbox";

  return (
    <input
      type={type}
      id={id}
      required={required}
      className={styles.input}
      value={isCheckbox ? undefined : formData[section][id]}
      checked={isCheckbox ? formData[section][id] : undefined}
      disabled={section === "billing" && formData.billing.checkbox && type !== "checkbox"}
      onChange={(e) => {
        const value = isCheckbox ? e.target.checked : e.target.value;

        setFormData((prevFormData) => {
          if (section === "billing" && isCheckbox) {
            return {
              ...prevFormData,
              billing: {
                ...prevFormData.billing,
                checkbox: value,
                ...(value ? prevFormData.shipping : {}),
              },
            };
          }

          if (section === "shipping" && prevFormData.billing.checkbox) {
            return {
              ...prevFormData,
              shipping: {
                ...prevFormData.shipping,
                [id]: value,
              },
              billing: {
                ...prevFormData.billing,
                [id]: value,
              },
            };
          }

          return {
            ...prevFormData,
            [section]: {
              ...prevFormData[section],
              [id]: value,
            },
          };
        });
      }}
    />
  );
}
