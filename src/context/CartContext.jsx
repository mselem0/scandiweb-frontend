import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('scandiweb-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('scandiweb-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  function toggleCart() {
    setCartOpened((cur) => !cur);
  }

  function openCart() {
    setCartOpened(true);
  }

  function closeCart() {
    setCartOpened(false);
  }

  /**
   * Generate a unique key for cart items based on product ID and selected attributes
   */
  function generateCartItemKey(productId, selectedAttributes) {
    const attrString = selectedAttributes
      ? Object.entries(selectedAttributes)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, value]) => `${key}:${value}`)
          .join('|')
      : '';
    return `${productId}_${attrString}`;
  }

  /**
   * Add item to cart or increase quantity if already exists
   */
  function addToCart(product, selectedAttributes = {}) {
    const cartItemKey = generateCartItemKey(product.id, selectedAttributes);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.cartItemKey === cartItemKey
      );

      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // New item, add to cart
        return [
          ...prevItems,
          {
            cartItemKey,
            product,
            selectedAttributes,
            quantity: 1,
            addedAt: new Date().toISOString(),
          },
        ];
      }
    });
  }

  /**
   * Remove item from cart completely
   */
  function removeFromCart(cartItemKey) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartItemKey !== cartItemKey)
    );
  }

  /**
   * Increase item quantity
   */
  function increaseQuantity(cartItemKey) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemKey === cartItemKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  /**
   * Decrease item quantity (remove if quantity becomes 0)
   */
  function decreaseQuantity(cartItemKey) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.cartItemKey === cartItemKey
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  /**
   * Clear entire cart
   */
  function clearCart() {
    setCartItems([]);
  }

  /**
   * Get total number of items in cart
   */
  function getCartCount() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Calculate cart total (using first currency found)
   */
  function getCartTotal() {
    return cartItems.reduce((total, item) => {
      const price = item.product.prices[0]?.amount || 0;
      return total + price * item.quantity;
    }, 0);
  }

  /**
   * Get currency symbol from first item (or default to $)
   */
  function getCurrencySymbol() {
    if (cartItems.length === 0) return '$';
    return (
      cartItems[0].product.prices[0]?.currency?.symbol ||
      cartItems[0].product.prices[0]?.currencySymbol ||
      '$'
    );
  }

  /**
   * Get currency label from first item (or default to USD)
   */
  function getCurrencyLabel() {
    if (cartItems.length === 0) return 'USD';
    return (
      cartItems[0].product.prices[0]?.currency?.label ||
      cartItems[0].product.prices[0]?.currency ||
      'USD'
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartOpened,
        cartItems,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        getCurrencySymbol,
        getCurrencyLabel,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("Context was used outside CartProvider");
  return context;
}

export { CartProvider, useCart };
