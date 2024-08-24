export type ShopifyErrorCode = 'ACCESS_DENIED' | 'SHOP_INACTIVE' | 'INTERNAL_SERVER_ERROR' | string;

export type ShopifyError = {
  message: string;
  extensions: {
    code: ShopifyErrorCode;
  };
};
export type ShopifyResponse<T> = {
  data: T;
  errors?: ShopifyError[];
};

