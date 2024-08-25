/* GraphQL */
export const getMetaobjectQuery = `#graphql
  query Metaobject($handle: String!, $type: String!) {
    metaobject(handle: { handle: $handle, type: $type }) {
      fields {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
        type
        value
        key
      }
    }
  }
`;

export const getMenuQuery = `#graphql
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;
