import Section from "./Section/Section.jsx";
import styles from "./Form.module.css";

export default function Form() {
  return (
    <div className={styles.container}>
      <p id="form-instructions">An asterisk (*) indicates a required field.</p>
      <form aria-labelledby="form-instructions" className={styles.form}>
        {sections.map(({ heading, controls }) => (
          <Section key={heading} heading={heading} controls={controls} />
        ))}
      </form>
    </div>
  );
}

const contact = [
  { type: "text", label: "First Name", id: "firstName", required: true },
  { type: "text", label: "Last Name", id: "lastName", required: true },
  { type: "email", label: "Email", id: "email", required: false },
  { type: "tel", label: "Phone", id: "phone", required: false },
];

const shipping = [
  { type: "text", label: "City", id: "city", required: true },
  { type: "select", label: "State", id: "state", required: false },
  { type: "tel", label: "ZIP", id: "zip", required: false },
  { type: "select", label: "Country", id: "country", required: true },
];

const billing = [{ type: "checkbox", label: "Same as shipping", id: "checkbox", required: false }];

const payment = [
  { type: "text", label: "Cardholder Name", id: "cardholder", required: true },
  { type: "tel", label: "Card Number", id: "card", required: true },
  { type: "date", label: "Expiration Date", id: "expiration", required: true },
  { type: "tel", label: "CCV", id: "ccv", required: true },
];

const sections = [
  { heading: "contact", controls: contact },
  { heading: "shipping", controls: shipping },
  { heading: "billing", controls: [...billing, ...shipping] },
  { heading: "payment", controls: payment },
];

export const initialFormData = sections.reduce((formData, { heading, controls }) => {
  formData[heading] = controls.reduce((fields, { id, type }) => {
    fields[id] = type === "checkbox" ? true : "";
    return fields;
  }, {});
  return formData;
}, {});

/*
  initialFormData = {
    contact: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    shipping: {
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    billing: {
      checkbox: true, //type === "checkbox"
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    payment: {
      cardholder: "",
      card: "",
      expiration: "",
      ccv: ""
    }
  };
*/
