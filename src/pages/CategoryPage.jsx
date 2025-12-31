import styles from "./CategoryPage.module.css";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useProductsByCategory } from "../hooks/useProducts";

function CategoryPage() {
  const { categorySlug } = useParams();
  
  // Fetch products by category from GraphQL
  const { products, loading, error } = useProductsByCategory(categorySlug);

  if (loading) {
    return (
      <div className={styles.category}>
        <div style={{ padding: "2rem", textAlign: "center" }}>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.category}>
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
          Error loading products: {error.message}
        </div>
      </div>
    );
  }

  // Capitalize category name for display
  const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  return (
    <div className={styles.category}>
      <h1 className={styles["category-heading"]}>{categoryName}</h1>
      {products.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          No products found in this category.
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}

export default CategoryPage;
