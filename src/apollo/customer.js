import gql from "graphql-tag";
import CustomerFragment from "./fragment/customerFragment";

export const customerCreate = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
      }
    }
  }
`;

export const customerAccessTokenCreate = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export const getCustomer = gql`
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...CustomerFragment
    }
  }
  ${CustomerFragment}
`;

export const getCustomerEmail = gql`
  query getCustomerName($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
    }
  }
`;
