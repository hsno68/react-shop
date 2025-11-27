import Header from "./Components/Header/Header.jsx";
import Carousel from "./Components/Carousel/Carousel.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Products from "./Components/Products/Products.jsx";
import layout from "./Home.module.css";

export default function Home() {
  return (
    <div className={layout.container}>
      <Header />
      <Carousel />
      <Categories />
      <Products />
    </div>
  );
}
