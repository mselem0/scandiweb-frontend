import styles from "./ProductAttributeOptions.module.css";
import { toKebabCase } from "../utils/testHelpers";

function ProductAttributeOption({ option, onClick, selected = false, testId }) {
  return (
    <div
      onClick={onClick}
      className={`${styles["product-attribute-option"]} ${
        selected ? styles["product-attribute-option--selected"] : ""
      }`}
      style={{ cursor: 'pointer' }}
      data-testid={testId}
    >
      {option}
    </div>
  );
}

function ProductAttributeSwatch({ color, onClick, selected = false, title, testId }) {
  return (
    <div
      onClick={onClick}
      className={`${styles["product-attribute-swatch"]} ${
        selected ? styles["product-attribute-swatch--selected"] : ""
      }`}
      style={{ backgroundColor: color, cursor: 'pointer' }}
      title={title}
      data-testid={testId}
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
      {product.attributes.map((attribute) => {
        const attributeNameKebab = toKebabCase(attribute.name);
        
        return (
          <div 
            key={attribute.id} 
            className={styles["product-attribute"]}
            data-testid={`product-attribute-${attributeNameKebab}`}
          >
            <h3 className={styles["product-attribute-label"]}>{attribute.name}:</h3>
            <div className={styles["product-attribute-options"]}>
              {attribute.type === "swatch" ? (
                // Render color swatches - use item.value for testId (hex color)
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
                    testId={`product-attribute-${attributeNameKebab}-${item.value}`}
                  />
                ))
              ) : (
                // Render text options (Size, Capacity, etc.) - use item.value for testId
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
                    testId={`product-attribute-${attributeNameKebab}-${item.value}`}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductAttributeOptions;
