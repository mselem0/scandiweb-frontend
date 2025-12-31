import styles from "./ProductAttributeOptions.module.css";
import { toKebabCase } from "../utils/testHelpers";

function ProductAttributeOption({ option, onClick, selected = false }) {
  return (
    <div
      onClick={onClick}
      className={`${styles["product-attribute-option"]} ${
        selected ? styles["product-attribute-option--selected"] : ""
      }`}
      style={{ cursor: 'pointer' }}
    >
      {option}
    </div>
  );
}

function ProductAttributeSwatch({ color, onClick, selected = false, title }) {
  return (
    <div
      onClick={onClick}
      className={`${styles["product-attribute-swatch"]} ${
        selected ? styles["product-attribute-swatch--selected"] : ""
      }`}
      style={{ backgroundColor: color, cursor: 'pointer' }}
      title={title}
    ></div>
  );
}

function ProductAttributeOptions({ selectedAttributes, dispatch, product }) {
  // If no product or no attributes, return null
  if (!product || !product.attributes || product.attributes.length === 0) {
    return null;
  }

  return (
    <>
      {product.attributes.map((attribute) => (
        <div 
          key={attribute.id} 
          className={styles["product-attribute"]}
          data-testid={`product-attribute-${toKebabCase(attribute.name)}`}
        >
          <h3 className={styles["product-attribute-label"]}>{attribute.name}:</h3>
          <div className={styles["product-attribute-options"]}>
            {attribute.type === "swatch" ? (
              // Render color swatches
              attribute.items.map((item) => (
                <ProductAttributeSwatch
                  key={item.id}
                  color={item.value}
                  title={item.displayValue}
                  onClick={() =>
                    dispatch({
                      type: "attributeSelected",
                      payload: { attributeId: attribute.id, itemId: item.id },
                    })
                  }
                  selected={selectedAttributes[attribute.id] === item.id}
                />
              ))
            ) : (
              // Render text options (Size, Capacity, etc.)
              attribute.items.map((item) => (
                <ProductAttributeOption
                  key={item.id}
                  option={item.displayValue}
                  onClick={() =>
                    dispatch({
                      type: "attributeSelected",
                      payload: { attributeId: attribute.id, itemId: item.id },
                    })
                  }
                  selected={selectedAttributes[attribute.id] === item.id}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductAttributeOptions;
