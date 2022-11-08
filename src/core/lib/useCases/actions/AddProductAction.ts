import { AddProductActionType } from "../actionType/AddProductActionType";

interface AddProduct {
  type: AddProductActionType.ADD_PRODUCT_SUCCESS;
  payload: any;
}

interface AddProductError {
  type: AddProductActionType.ADD_PRODUCT_FAILED;
  payload: any;
}
interface AddProductReset {
  type: AddProductActionType.ADD_PRODUCT_RESET;
  payload: any;
}

export type AddProductAction =
  | AddProduct
  | AddProductError
  | AddProductReset;
