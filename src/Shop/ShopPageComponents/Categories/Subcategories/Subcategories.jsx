export default function Subcategories({ items }) {
  return (
    <ul>
      {items.map((subCategory) => (
        <li key={subCategory}>{subCategory}</li>
      ))}
    </ul>
  );
}
