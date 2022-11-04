import { addProductBrand } from "../actionType/AddProductBrandActionTypes";

interface AddProductBrand {
  type: addProductBrand.ADD_PRODUCT_BRAND_SUCCESS;
  payload: any;
}

interface AddProductBrandError {
  type: addProductBrand.ADD_PRODUCT_BRAND_FAILED;
  payload: any;
}
interface AddProductBrandReset {
  type: addProductBrand.ADD_PRODUCT_BRAND_RESET;
  payload: any;
}

export type AddProductBrandAction =
  | AddProductBrand
  | AddProductBrandError
  | AddProductBrandReset;
