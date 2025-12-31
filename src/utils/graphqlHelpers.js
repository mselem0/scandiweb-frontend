/**
 * Format cart items for order creation
 * Converts cart items to the format expected by the createOrder mutation
 * 
 * @param {Array} cartItems - Array of cart items from CartContext
 * @returns {Array} Formatted items for order mutation
 */
export const formatCartItemsForOrder = (cartItems) => {
  return cartItems.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
    selectedAttributes: item.selectedAttributes
      ? Object.entries(item.selectedAttributes).map(([attributeId, attributeItemId]) => ({
          attributeId,
          attributeItemId,
        }))
      : [],
  }));
};

/**
 * Extract price for a specific currency from product prices
 * 
 * @param {Array} prices - Array of price objects
 * @param {string} currencySymbol - Currency symbol (default: '$')
 * @returns {Object|null} Price object or null if not found
 */
export const getPriceForCurrency = (prices, currencySymbol = '$') => {
  if (!prices || !Array.isArray(prices)) return null;
  return prices.find((price) => price.currency.symbol === currencySymbol);
};

/**
 * Calculate total price for cart items
 * 
 * @param {Array} cartItems - Array of cart items with prices
 * @param {string} currencySymbol - Currency symbol (default: '$')
 * @returns {number} Total price
 */
export const calculateTotal = (cartItems, currencySymbol = '$') => {
  return cartItems.reduce((total, item) => {
    const price = getPriceForCurrency(item.prices, currencySymbol);
    return total + (price ? price.amount * item.quantity : 0);
  }, 0);
};

/**
 * Format attribute items for display
 * 
 * @param {Array} attributes - Product attributes
 * @returns {Object} Formatted attributes grouped by attribute ID
 */
export const formatAttributes = (attributes) => {
  if (!attributes || !Array.isArray(attributes)) return {};
  
  return attributes.reduce((acc, attribute) => {
    acc[attribute.id] = {
      name: attribute.name,
      type: attribute.type,
      items: attribute.items,
    };
    return acc;
  }, {});
};

/**
 * Check if a product has all required attributes selected
 * 
 * @param {Object} product - Product object with attributes
 * @param {Object} selectedAttributes - Selected attributes object
 * @returns {boolean} True if all required attributes are selected
 */
export const hasAllRequiredAttributes = (product, selectedAttributes) => {
  if (!product?.attributes || product.attributes.length === 0) return true;
  
  return product.attributes.every((attribute) => {
    return selectedAttributes && selectedAttributes[attribute.id];
  });
};
