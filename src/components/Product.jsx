import { IoCartOutline } from "react-icons/io5";
import styles from "./Product.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toKebabCase } from "../utils/testHelpers";

function Product({ product }) {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  // Handle both old and new data structure for backward compatibility
  const currencySymbol =
    product.prices[0]?.currency?.symbol ||
    product.prices[0]?.currencySymbol ||
    "$";
  const amount = product.prices[0]?.amount || 0;

  const hasAttributes =
    product.attributes && product.attributes.length > 0;

  const handleQuickShop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) {
      return;
    }

    // If product has attributes, redirect to product page
    if (hasAttributes) {
      navigate(`/product/${product.id}`);
    } else {
      // If no attributes, add directly to cart
      addToCart(product, {});
      openCart();
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={styles["product-card"]}
      data-testid={`product-${toKebabCase(product.name)}`}
    >
      <div className={styles["product-image-wrapper"]}>
        <img
          className={styles["product-image"]}
          src={product.gallery[0]}
          alt={product.name}
        />
        {!product.inStock && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#8D8F9A",
            }}
          >
            OUT OF STOCK
          </div>
        )}
      </div>
      {product.inStock && (
        <button
          className={styles["product-quick-shop"]}
          onClick={handleQuickShop}
          title={hasAttributes ? "View product" : "Add to cart"}
        >
          <IoCartOutline size={24} color="#fff" />
        </button>
      )}
      <div className={styles["product-info"]}>
        <h3 className={styles["product-name"]}>{product.name}</h3>
        <span className={styles["product-price"]}>
          {currencySymbol}
          {amount}
        </span>
      </div>
    </Link>
  );
}

export default Product;
