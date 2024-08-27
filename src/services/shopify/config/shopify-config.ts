import {
  GetMenuQuery,
  GetMenuQueryVariables,
  MetaobjectQuery,
  MetaobjectQueryVariables,
} from "@/types/storefront/storefront.generated";
import { shopifyStorefront } from "../shopify-storefront";
import { getMenuQuery, getMetaobjectQuery } from "./queries.storefront";
import { configDTO, menuDTO } from "./config.dto";
import { TAGS } from "../constants";

export class ShopifyConfig {
  fetchConfig = async () => {
    const variables: MetaobjectQueryVariables = {
      type: "headless_config",
      handle: "main",
    };

    const response = await shopifyStorefront.fetch<MetaobjectQuery>({
      query: getMetaobjectQuery,
      variables,
      tags: [TAGS.config]
    });

    return configDTO(response.body.data);
  };

  getMenu = async (handle: string) => {
    const variables: GetMenuQueryVariables = {
      handle,
    };

    const response = await shopifyStorefront.fetch<GetMenuQuery>({
      query: getMenuQuery,
      variables,
      tags: [TAGS.config]
    });

    return menuDTO(response.body.data);
  }
}

export const shopifyConfig = new ShopifyConfig();
