import { DeleteProductBrandActionType } from "../../useCases/actionType/deleteProductBrandByIdActionType";
import { DeleteProductBrandAction } from "../../useCases/actions/deleteProductBrandByIdAction";

type UserState = {
  dltdata3: any;
  dlterror3: string | undefined;
};

const initialState = {
  dltdata3: undefined,
  dlterror3: undefined,
};

const deleteProductBrandReducer = (
  state: UserState = initialState,
  action: DeleteProductBrandAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case DeleteProductBrandActionType.DELETE_PRODUCT_BRAND_SUCCESS:
      return {
        ...state,
        dltdata3: action.payload,
      };
    case DeleteProductBrandActionType.DELETE__PRODUCT_BRAND_FAILED:
      return {
        ...state,
        dlterror3: action.payload,
      };
    case DeleteProductBrandActionType.DELETE__PRODUCT_BRAND_RESET:
      return {
        ...state,
        dltdata3: action.payload,
        dlterror3: action.payload,
      };
    default:
      return state;
  }
};

export default deleteProductBrandReducer;
