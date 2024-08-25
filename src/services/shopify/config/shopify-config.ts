import {
  GetMenuQuery,
  GetMenuQueryVariables,
  MetaobjectQuery,
  MetaobjectQueryVariables,
} from "@/types/storefront.generated";
import { ShopifyBase } from "../shopify-base";
import { getMenuQuery, getMetaobjectQuery } from "./queries.storefront";
import { configDTO, menuDTO } from "./config.dto";
import { TAGS } from "../constants";

export class ShopifyConfig extends ShopifyBase {
  fetchConfig = async () => {
    const variables: MetaobjectQueryVariables = {
      type: "headless_config",
      handle: "main",
    };

    const response = await this.shopifyFetch<MetaobjectQuery>({
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

    const response = await this.shopifyFetch<GetMenuQuery>({
      query: getMenuQuery,
      variables,
      tags: [TAGS.config]
    });

    return menuDTO(response.body.data);
  }
}

export const shopifyConfig = new ShopifyConfig();
