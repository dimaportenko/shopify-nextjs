import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset";

const storefrontApiVersion = process.env.STOREFRONT_API_VERSION ?? "2024-07";
const adminApiVersion = process.env.ADMIN_API_VERSION ?? "2024-07";

export default {
  schema: [
    `https://shopify.dev/storefront-graphql-direct-proxy`,
    `https://shopify.dev/admin-graphql-direct-proxy`
  ],
  projects: {
    storefront: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: storefrontApiVersion,
      documents: ["./src/services/**/*.storefront.{js,ts,jsx,tsx}"],
      outputDir: "./src/types/storefront",
    }),
    admin: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: adminApiVersion,
      documents: ["./src/services/**/*.admin.{js,ts,jsx,tsx}"],
      outputDir: "./src/types/admin",
    }),
  },
};
