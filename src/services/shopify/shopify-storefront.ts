import { ShopifyBase } from "./shopify-base";
import { SHOPIFY_STOREFRONT_API_ENDPOINT } from "./constants";
import { ensureStartsWith } from "@/lib/utils";
import invariant from "tiny-invariant";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";
const endpoint = `${domain}${SHOPIFY_STOREFRONT_API_ENDPOINT}`;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export class ShopifyStorefront extends ShopifyBase {
  protected endpoint: string;
  protected accessToken: string;

  constructor() {
    super();
    this.endpoint = endpoint;
    invariant(
      SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      "SHOPIFY_STOREFRONT_ACCESS_TOKEN is required"
    );
    this.accessToken = SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  }

  async fetch<T>(options: {
    query: string;
    variables?: Record<string, unknown>;
    cache?: RequestCache;
    tags?: string[];
  }) {
    return this.shopifyFetch<T>({
      ...options,
      headers: {
        "X-Shopify-Storefront-Access-Token": this.accessToken,
      },
    });
  }
}

export const shopifyStorefront = new ShopifyStorefront();