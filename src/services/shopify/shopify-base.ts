import { SHOPIFY_GRAPHQL_API_ENDPOINT } from "@/lib/constants";
import { isShopifyError } from "@/lib/type-guards";
import { ensureStartsWith } from "@/lib/utils";
import invariant from "tiny-invariant";

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export class ShopifyBase {
  async shopifyFetch<T>({
    cache = "force-cache",
    headers,
    query,
    tags,
    variables,
  }: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: Record<string, unknown> | undefined;
  }): Promise<{ status: number; body: { data: T } } | never> {
    invariant(
      SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      "SHOPIFY_STOREFRONT_ACCESS_TOKEN is required",
    );

    try {
      const result = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          ...headers,
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables }),
        }),
        cache,
        ...(tags && { next: { tags } }),
      });

      const body = await result.json();

      if (body.errors) {
        throw body.errors[0];
      }

      return {
        status: result.status,
        body,
      };
    } catch (e) {
      if (isShopifyError(e)) {
        throw {
          cause: e.cause?.toString() || "unknown",
          status: e.status || 500,
          message: e.message,
          query,
        };
      }

      throw {
        error: e,
        query,
      };
    }
  }
}
