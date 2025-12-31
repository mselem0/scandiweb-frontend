import { useQuery } from '@apollo/client/react';
import { GET_ALL_CATEGORIES, GET_CATEGORY_BY_NAME } from '../graphql/queries';

/**
 * Hook to fetch all categories
 */
export const useCategories = () => {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);

  return {
    categories: data?.categories || [],
    loading,
    error,
  };
};

/**
 * Hook to fetch a specific category by name
 * @param {string} name - Category name
 */
export const useCategory = (name) => {
  const { data, loading, error } = useQuery(GET_CATEGORY_BY_NAME, {
    variables: { name },
    skip: !name,
  });

  return {
    category: data?.category,
    loading,
    error,
  };
};
