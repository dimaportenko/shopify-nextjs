/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type MetaobjectQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
  type: StorefrontTypes.Scalars['String']['input'];
}>;


export type MetaobjectQuery = { metaobject?: StorefrontTypes.Maybe<{ fields: Array<(
      Pick<StorefrontTypes.MetaobjectField, 'type' | 'value' | 'key'>
      & { reference?: StorefrontTypes.Maybe<{ image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>> }> }
    )> }> };

export type GetMenuQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type GetMenuQuery = { menu?: StorefrontTypes.Maybe<{ items: Array<Pick<StorefrontTypes.MenuItem, 'title' | 'url'>> }> };

interface GeneratedQueryTypes {
  "#graphql\n  query Metaobject($handle: String!, $type: String!) {\n    metaobject(handle: { handle: $handle, type: $type }) {\n      fields {\n        reference {\n          ... on MediaImage {\n            image {\n              url\n            }\n          }\n        }\n        type\n        value\n        key\n      }\n    }\n  }\n": {return: MetaobjectQuery, variables: MetaobjectQueryVariables},
  "#graphql\n  query getMenu($handle: String!) {\n    menu(handle: $handle) {\n      items {\n        title\n        url\n      }\n    }\n  }\n": {return: GetMenuQuery, variables: GetMenuQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
