import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset";

const storefrontApiVersion = process.env.STOREFRONT_API_VERSION ?? "2024-07";

export default {
  schema: [`https://shopify.dev/storefront-graphql-direct-proxy`],
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: storefrontApiVersion,
      documents: ["./src/services/**/*.storefront.{js,ts,jsx,tsx}"],
      outputDir: "./src/types",
    }),
  },
};
