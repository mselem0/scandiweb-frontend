import { useMutation } from '@apollo/client/react';
import { CREATE_ORDER } from '../graphql/mutations';

/**
 * Hook to create an order
 * 
 * @example
 * const { createOrder, loading, error, data } = useCreateOrder();
 * 
 * const handleCheckout = async () => {
 *   try {
 *     const result = await createOrder({
 *       items: [
 *         {
 *           productId: "huarache-x-stussy-le",
 *           quantity: 1,
 *           selectedAttributes: [
 *             { attributeId: "Size", attributeItemId: "40" },
 *             { attributeId: "Color", attributeItemId: "Green" }
 *           ]
 *         }
 *       ]
 *     });
 *     console.log('Order created:', result.data.createOrder);
 *   } catch (err) {
 *     console.error('Order creation failed:', err);
 *   }
 * };
 */
export const useCreateOrder = () => {
  const [createOrderMutation, { data, loading, error }] = useMutation(CREATE_ORDER);

  const createOrder = async ({ items }) => {
    return await createOrderMutation({
      variables: { items },
    });
  };

  return {
    createOrder,
    data: data?.createOrder,
    loading,
    error,
  };
};
