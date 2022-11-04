import { getProductBrandActionType } from "../../useCases/actionType/getProductBrandActionType";
import { GetProductBrandAction } from "../../useCases/actions/getProductBrandAction";

type UserState = {
  productBrand: any;
  error3: string | undefined;
};

const initialState = {
    productBrand: undefined,
  error3: undefined,
};

const getProductBrandReducer = (
  state: UserState = initialState,
  action: GetProductBrandAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case getProductBrandActionType.GET_PRODUCT_BRAND_SUCCESS:
      return {
        ...state,
        productBrand: action.payload,
      };
    case getProductBrandActionType.GET_PRODUCT_BRAND_FAILED:
      return {
        ...state,
        error3: action.payload,
      };
    case getProductBrandActionType.GET_PRODUCT_BRAND_FAILED:
      return {
        ...state,
        productBrand: action.payload,
        error3: action.payload,
      };
    default:
      return state;
  }
};

export default getProductBrandReducer;
