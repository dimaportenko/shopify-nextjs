import {
  MetaobjectQuery,
  MetaobjectQueryVariables,
} from "@/types/storefront.generated";
import { ShopifyBase } from "../shopify-base";
import { getMetaobjectQuery } from "./queries.storefront";
import { configDTO } from "./config.dto";

export class ShopifyConfig extends ShopifyBase {
  fetchConfig = async () => {
    const variables: MetaobjectQueryVariables = {
      type: "headless_config",
      handle: "main",
    };

    const response = await this.shopifyFetch<MetaobjectQuery>({
      query: getMetaobjectQuery,
      variables,
    });

    return configDTO(response.body.data);
  };
}
