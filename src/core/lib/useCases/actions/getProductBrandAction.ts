import { getProductBrandActionType } from "../actionType/getProductBrandActionType";

interface GetProductBrandActionSuccess {
  type: getProductBrandActionType.GET_PRODUCT_BRAND_SUCCESS;
  payload: any;
}

interface GetProductBrandActionError {
  type: getProductBrandActionType.GET_PRODUCT_BRAND_FAILED;
  payload: any;
}
interface GetProductBrandActionReset {
  type: getProductBrandActionType.GET_PRODUCT_BRAND_RESET;
  payload: any;
}

export type GetProductBrandAction =
  | GetProductBrandActionSuccess
  | GetProductBrandActionError
  | GetProductBrandActionReset;
