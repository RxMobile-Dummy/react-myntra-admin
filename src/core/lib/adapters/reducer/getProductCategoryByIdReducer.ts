import { GetProductCategoryByID } from "../../useCases/actionType/getProductCategoryById";
import { GetProductCategoryByIDAction } from "../../useCases/actions/getProductCategoryByIdAction";

type UserState = {
  productCategory: any;
  error3: string | undefined;
};

const initialState = {
  productCategory: undefined,
  error3: undefined,
};

const getProductCategoryByIdReducer = (
  state: UserState = initialState,
  action: GetProductCategoryByIDAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        productCategory: action.payload,
      };
    case GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_FAILED:
      return {
        ...state,
        error3: action.payload,
      };
    case GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_FAILED:
      return {
        ...state,
        productCategory: action.payload,
        error3: action.payload,
      };
    default:
      return state;
  }
};

export default getProductCategoryByIdReducer;
