import { MetaobjectQuery } from "@/types/storefront.generated";

export type ConfigDTO = {
  logo?: string;
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
      default:
        break;
    }
  });

  return config;
};
