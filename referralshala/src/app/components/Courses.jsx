import { useState } from "react";
import "../styles/Courses.css";


const products = [
  { id: 1, name: "Product 1", price: "$20", image: "https://via.placeholder.com/150", link: "#" },
  { id: 2, name: "Product 2", price: "$25", image: "https://via.placeholder.com/150", link: "#" },
  { id: 3, name: "Product 3", price: "$30", image: "https://via.placeholder.com/150", link: "#" },
  { id: 4, name: "Product 4", price: "$35", image: "https://via.placeholder.com/150", link: "#" },
  { id: 5, name: "Product 5", price: "$40", image: "https://via.placeholder.com/150", link: "#" },
  { id: 6, name: "Product 6", price: "$45", image: "https://via.placeholder.com/150", link: "#" },
];

function Product({ product }) {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price}</p>
      <a href={product.link} className="product-link">View</a>
    </div>
  );
}

export default function Carousel() {
    const [startIndex, setStartIndex] = useState(0);
    const visibleProducts = 4;
  
    const handlePrev = () => {
      setStartIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };
  
    const handleNext = () => {
      setStartIndex((prev) => (prev < products.length - visibleProducts ? prev + 1 : prev));
    };
  
    return (
      <div className="carousel-container">
        <button onClick={handlePrev} disabled={startIndex === 0} className="carousel-button">
          ◀
        </button>
  
        <div className="carousel-wrapper">
          <div className="carousel">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`carousel-item ${index >= startIndex && index < startIndex + visibleProducts ? "visible" : "hidden"}`}
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
  
        <button onClick={handleNext} disabled={startIndex >= products.length - visibleProducts} className="carousel-button">
          ▶
        </button>
      </div>
    );
  }
  
