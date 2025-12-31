import styles from "./ProductPrice.module.css";

function ProductPrice({ product }) {
  // Handle both old and new data structure for backward compatibility
  const currencySymbol = product.prices[0]?.currency?.symbol || product.prices[0]?.currencySymbol || "$";
  const amount = product.prices[0]?.amount || 0;

  return (
    <div className={styles["product-price-section"]}>
      <div className={styles["product-price-label"]}>Price:</div>
      <div className={styles["product-price-value"]}>
        {currencySymbol}
        {amount}
      </div>
    </div>
  );
}

export default ProductPrice;
