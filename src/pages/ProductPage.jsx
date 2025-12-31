import ProductAttributeOptions from "../components/ProductAttributeOptions";
import ProductPrice from "../components/ProductPrice";
import ProductGallery from "../components/ProductGallery";
import styles from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import { useReducer, useState } from "react";
import { useProduct } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { hasAllRequiredAttributes } from "../utils/graphqlHelpers";
import parse from 'html-react-parser';

const initialState = {
  selectedAttributes: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "attributeSelected":
      return {
        ...state,
        selectedAttributes: {
          ...state.selectedAttributes,
          [action.payload.attributeId]: action.payload.itemId,
        },
      };
    default:
      return state;
  }
}

function ProductPage() {
  const [{ selectedAttributes }, dispatch] = useReducer(reducer, initialState);
  const [addedToCart, setAddedToCart] = useState(false);
  const { productId } = useParams();

  // Fetch product from GraphQL
  const { product, loading, error } = useProduct(productId);

  // Cart functions
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;

    // Check if all required attributes are selected
    if (!hasAllRequiredAttributes(product, selectedAttributes)) {
      alert("Please select all required attributes");
      return;
    }

    // Add to cart
    addToCart(product, selectedAttributes);

    // Show success feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);

    // Open cart overlay
    openCart();
  };

  if (loading) {
    return (
      <div className={styles["product-details-grid"]}>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Loading product...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["product-details-grid"]}>
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
          Error loading product: {error.message}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles["product-details-grid"]}>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Product not found
        </div>
      </div>
    );
  }

  const canAddToCart =
    product.inStock && hasAllRequiredAttributes(product, selectedAttributes);

  return (
    <div className={styles["product-details-grid"]}>
      <ProductGallery product={product} />
      <div>
        <div className={styles["product-info"]}>
          <h1 className={styles["product-info-title"]}>{product.name}</h1>
          <ProductAttributeOptions
            selectedAttributes={selectedAttributes}
            dispatch={dispatch}
            product={product}
          />
          <ProductPrice product={product} />
          <button
            className={styles["product-add-to-cart"]}
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            style={{
              backgroundColor: addedToCart ? "#4CAF50" : "",
              cursor: canAddToCart ? "pointer" : "not-allowed",
            }}
            data-testid="add-to-cart"
          >
            {addedToCart
              ? "✓ Added to Cart!"
              : !product.inStock
              ? "Out of Stock"
              : !hasAllRequiredAttributes(product, selectedAttributes)
              ? "Select Options"
              : "Add to Cart"}
          </button>
          <div
            className={styles["product-description"]}
            data-testid="product-description"
          >
            {parse(product.description)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
