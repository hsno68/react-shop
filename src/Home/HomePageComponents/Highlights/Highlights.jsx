import Card from "./Card/Card.jsx";
import styles from "./Highlights.module.css";

export default function Highlights() {
  const data = [
    {
      icon: "delivery_truck_speed",
      title: "Fast Shipping",
      desc: "Fast, reliable shipping you can count on — most orders arrive within 1–2 days.",
    },
    {
      icon: "sync",
      title: "Easy Returns",
      desc: "Changed your mind? No worries — you can return items anytime within 30 days, hassle-free.",
    },
    {
      icon: "encrypted",
      title: "Secure Checkout",
      desc: "Your payment information is protected with modern encryption for a safe and secure checkout experience.",
    },
    {
      icon: "star",
      title: "Quality Products",
      desc: "We carefully curate each product so you only get items you'll truly love.",
    },
  ];

  return (
    <div className={styles.container}>
      <h2>Shop with Confidence</h2>
      <ul className={styles.gridContainer}>
        {data.map(({ icon, title, desc }) => (
          <Card key={title} icon={icon} title={title} desc={desc} />
        ))}
      </ul>
    </div>
  );
}
