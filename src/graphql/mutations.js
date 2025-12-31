import { gql } from '@apollo/client';

// ============================================
// ORDER MUTATIONS
// ============================================

export const CREATE_ORDER = gql`
  mutation CreateOrder($items: [OrderItemInput]!) {
    createOrder(items: $items) {
      id
      totalAmount
      currency
      status
      itemCount
    }
  }
`;
