import { MetaobjectQuery } from "@/types/storefront.generated";
import { ShopifyBase } from "../shopify-base";
import { getMetaobjectQuery } from "./queries.storefront";

class ShopifyConfig extends ShopifyBase {
  fetchConfig = async () => {
    const response = await this.shopifyFetch<MetaobjectQuery>({
      query: getMetaobjectQuery,
      // variables:
    });
  };
}
