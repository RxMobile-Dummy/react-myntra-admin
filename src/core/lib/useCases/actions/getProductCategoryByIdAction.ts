import { GetProductCategoryByID } from "../actionType/getProductCategoryById";

interface GetProductCategoryByIDI {
  type: GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_SUCCESS;
  payload: any;
}

interface GetProductCategoryByIDError {
  type: GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_FAILED;
  payload: any;
}
interface GetProductCategoryByIDReset {
  type: GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_RESET;
  payload: any;
}

export type GetProductCategoryByIDAction =
  | GetProductCategoryByIDI
  | GetProductCategoryByIDError
  | GetProductCategoryByIDReset;
