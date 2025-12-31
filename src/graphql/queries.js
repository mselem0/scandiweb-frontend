import { gql } from '@apollo/client';

// ============================================
// CATEGORY QUERIES
// ============================================

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      name
    }
  }
`;

export const GET_CATEGORY_BY_NAME = gql`
  query GetCategory($name: String!) {
    category(name: $name) {
      name
    }
  }
`;

// ============================================
// PRODUCT QUERIES
// ============================================

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      brand
      inStock
      gallery
      description
      category
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String) {
    products(category: $category) {
      id
      name
      brand
      inStock
      gallery
      description
      category
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      gallery
      description
      category
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;
