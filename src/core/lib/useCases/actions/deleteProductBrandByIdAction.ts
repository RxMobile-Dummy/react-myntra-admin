import { DeleteProductBrandActionType } from "../actionType/deleteProductBrandByIdActionType";

interface DeleteProductBrand {
  type: DeleteProductBrandActionType.DELETE_PRODUCT_BRAND_SUCCESS;
  payload: any;
}

interface DeleteProductBrandError {
  type: DeleteProductBrandActionType.DELETE__PRODUCT_BRAND_FAILED;
  payload: any;
}
interface DeleteProductBrandReset {
  type: DeleteProductBrandActionType.DELETE__PRODUCT_BRAND_RESET;
  payload: any;
}

export type DeleteProductBrandAction =
  | DeleteProductBrand
  | DeleteProductBrandError
  | DeleteProductBrandReset;
