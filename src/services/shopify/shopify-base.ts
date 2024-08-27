import { isShopifyError } from "@/lib/type-guards";
import { ensureStartsWith } from "@/lib/utils";
import invariant from "tiny-invariant";
import { ShopifyResponse } from "./types";
import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "./constants";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export abstract class ShopifyBase {
  protected abstract endpoint: string;
  protected abstract accessToken: string;

  async shopifyFetch<T>({
    cache = "force-cache",
    headers,
    query,
    tags = [],
    variables,
  }: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: Record<string, unknown> | undefined;
  }): Promise<{ status: number; body: { data: T } } | never> {
    try {
      const result = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables }),
        }),
        cache,
        ...(tags && { next: { tags: [TAGS.all, ...tags] } }),
      });

      const body: ShopifyResponse<T> = await result.json();

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
