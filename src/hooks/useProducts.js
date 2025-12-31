import { useQuery } from '@apollo/client/react';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_BY_ID,
} from '../graphql/queries';

/**
 * Hook to fetch all products
 */
export const useProducts = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_PRODUCTS);

  return {
    products: data?.products || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch products by category
 * @param {string} category - Category name (e.g., 'all', 'clothes', 'tech')
 */
export const useProductsByCategory = (category) => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { category },
    skip: !category,
  });

  return {
    products: data?.products || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch a single product by ID
 * @param {string} id - Product ID
 */
export const useProduct = (id) => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
    skip: !id,
  });

  return {
    product: data?.product,
    loading,
    error,
    refetch,
  };
};
