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
