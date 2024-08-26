import { removeDomainFromUrl } from "@/lib/utils";
import { MetaobjectQuery } from "@/types/storefront.generated";
import { GetMenuQuery } from "@/types/storefront.generated";

export type ConfigDTO = {
  logo?: string;
  shopName?: string;
};

export const configDTO = (data: MetaobjectQuery): ConfigDTO => {
  let config = {};

  data.metaobject?.fields.forEach((field) => {
    switch (field.key) {
      case "logo":
        config = {
          ...config,
          logo: field?.reference?.image?.url,
        };
        break;
      case "shop_name":
        config = {
          ...config,
          shopName: field?.value,
        };
        break;
      default:
        break;
    }
  });

  return config;
};

export const menuDTO = (data?: GetMenuQuery) => {
  return data?.menu ? {
    ...data.menu,
    items: data.menu.items.map(item => ({
      ...item,
      path: removeDomainFromUrl(item.url)
    }))
  } : undefined;
};

export type MenuDTO = ReturnType<typeof menuDTO>;