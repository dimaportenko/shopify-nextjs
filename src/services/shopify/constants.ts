export const SHOPIFY_API_VERSION =
  process.env.SHOPIFY_API_VERSION || "2024-07";
export const SHOPIFY_STOREFRONT_API_ENDPOINT = `/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_ADMIN_API_ENDPOINT = `/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

export const TAGS = {
  all: "all",
  config: "config",
  collections: "collections",
  products: "products",
  cart: "cart",
};
