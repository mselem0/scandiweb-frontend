import { useCart } from "../context/CartContext";
import { useCreateOrder } from "../hooks/useOrder";
import { formatCartItemsForOrder } from "../utils/graphqlHelpers";
import styles from "./CartOverlay.module.css";
import { useState } from "react";
import { toKebabCase } from "../utils/testHelpers";

function CartOverlay() {
  const {
    cartOpened,
    cartItems,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    getCartCount,
    getCartTotal,
    getCurrencySymbol,
    clearCart,
  } = useCart();

  const { createOrder, loading: orderLoading } = useCreateOrder();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const itemCount = getCartCount();
  const total = getCartTotal();
  const currencySymbol = getCurrencySymbol();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      setOrderError(null);
      setOrderSuccess(false);

      // Format cart items for GraphQL mutation
      const orderItems = formatCartItemsForOrder(cartItems);

      // Create order
      const result = await createOrder({ items: orderItems });

      if (result.data) {
        setOrderSuccess(true);
        // Clear cart after successful order
        setTimeout(() => {
          clearCart();
          setOrderSuccess(false);
          closeCart();
        }, 2000);
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      setOrderError(error.message || 'Failed to place order. Please try again.');
    }
  };

  // Don't render overlay content if cart is not opened
  if (!cartOpened) {
    return null;
  }

  return (
    <div
      className={`${styles["cart-overlay"]} ${styles["cart-overlay--opened"]}`}
      data-testid="cart-overlay"
    >
      <div className={styles["cart-backdrop"]} onClick={closeCart}></div>

      <aside className={styles["cart-sidebar"]}>
        <div className={styles["cart-header"]}>
          <h2 className={styles["cart-title"]}>My Bag</h2>
          <span className={styles["cart-item-count"]}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className={styles["cart-items"]}>
          {cartItems.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8D8F9A' }}>
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => {
              const price = item.product.prices[0]?.amount || 0;
              const itemCurrencySymbol =
                item.product.prices[0]?.currency?.symbol ||
                item.product.prices[0]?.currencySymbol ||
                '$';

              return (
                <div key={item.cartItemKey} className={styles["cart-item"]}>
                  <div className={styles["cart-item-info"]}>
                    <div className={styles["cart-item-name"]}>
                      {item.product.brand}
                    </div>
                    <div style={{ fontSize: '14px', marginTop: '4px' }}>
                      {item.product.name}
                    </div>
                    <div className={styles["cart-item-price"]}>
                      {itemCurrencySymbol}
                      {price.toFixed(2)}
                    </div>

                    {item.product.attributes && item.product.attributes.length > 0 && (
                      <div className={styles["cart-item-attributes"]}>
                        {item.product.attributes.map((attribute) => {
                          const selectedValue = item.selectedAttributes?.[attribute.id];
                          const attributeNameKebab = toKebabCase(attribute.name);

                          return (
                            <div
                              key={attribute.id}
                              className={styles["cart-item-attribute"]}
                              data-testid={`cart-item-attribute-${attributeNameKebab}`}
                            >
                              <div className={styles["cart-item-attribute-label"]}>
                                {attribute.name}:
                              </div>
                              <div className={styles["cart-item-attribute-options"]}>
                                {attribute.items.map((attrItem) => {
                                  const isSelected = attrItem.id === selectedValue;
                                  // Use item.value for test ID (matches PDP format)
                                  const testId = isSelected 
                                    ? `cart-item-attribute-${attributeNameKebab}-${attrItem.value}-selected`
                                    : `cart-item-attribute-${attributeNameKebab}-${attrItem.value}`;

                                  if (attribute.type === 'swatch') {
                                    return (
                                      <span
                                        key={attrItem.id}
                                        className={`${styles["cart-item-attribute-swatch"]} ${
                                          isSelected ? styles["cart-item-attribute-swatch--selected"] : ""
                                        }`}
                                        style={{ 
                                          backgroundColor: attrItem.value,
                                          cursor: 'default',
                                          pointerEvents: 'none'
                                        }}
                                        title={attrItem.displayValue}
                                        data-testid={testId}
                                      ></span>
                                    );
                                  } else {
                                    return (
                                      <div
                                        key={attrItem.id}
                                        className={`${styles["cart-item-attribute-option"]} ${
                                          isSelected ? styles["cart-item-attribute-option--selected"] : ""
                                        }`}
                                        style={{
                                          cursor: 'default',
                                          pointerEvents: 'none'
                                        }}
                                        data-testid={testId}
                                      >
                                        {attrItem.displayValue}
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className={styles["cart-item-quantity"]}>
                    <button
                      className={styles["cart-item-quantity-btn"]}
                      onClick={() => increaseQuantity(item.cartItemKey)}
                      data-testid="cart-item-amount-increase"
                    >
                      +
                    </button>
                    <span 
                      className={styles["cart-item-quantity-value"]}
                      data-testid="cart-item-amount"
                    >
                      {item.quantity}
                    </span>
                    <button
                      className={styles["cart-item-quantity-btn"]}
                      onClick={() => decreaseQuantity(item.cartItemKey)}
                      data-testid="cart-item-amount-decrease"
                    >
                      -
                    </button>
                  </div>

                  <div className={styles["cart-item-image"]}>
                    <img
                      src={item.product.gallery[0]}
                      alt={item.product.name}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className={styles["cart-footer"]}>
          <div className={styles["cart-total"]} data-testid="cart-total">
            <span className={styles["cart-total-label"]}>Total</span>
            <span className={styles["cart-total-value"]}>
              {currencySymbol}
              {total.toFixed(2)}
            </span>
          </div>

          {orderSuccess && (
            <div
              style={{
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textAlign: 'center',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              Order placed successfully! ✓
            </div>
          )}

          {orderError && (
            <div
              style={{
                padding: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                textAlign: 'center',
                borderRadius: '4px',
                marginBottom: '10px',
                fontSize: '14px',
              }}
            >
              {orderError}
            </div>
          )}

          <button
            className={styles["cart-place-order-btn"]}
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0 || orderLoading}
          >
            {orderLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartOverlay;
