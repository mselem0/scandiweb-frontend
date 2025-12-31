import Product from "./Product";
import styles from "./ProductList.module.css";

function ProductList({ products }) {
  return (
    <div className={styles["products-grid"]}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
