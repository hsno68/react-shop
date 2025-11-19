import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/" className="link">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}
