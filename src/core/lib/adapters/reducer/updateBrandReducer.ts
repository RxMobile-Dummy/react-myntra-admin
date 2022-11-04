import { UpdateBrandByID } from "../../useCases/actionType/updateBrandByID";
import { UpdateBrandAction } from "../../useCases/actions/updateBrandAction";


type UserState = {
    updatedBrand: any;
  resetError: string | undefined;
};

const initialState = {
  updatedBrand : undefined,
  resetError : undefined
};

const updatedBrandReducer = (state: UserState = initialState, action: UpdateBrandAction): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case UpdateBrandByID.UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        updatedBrand: action.payload,
      };
    case UpdateBrandByID.UPDATE_BRAND_FAILED:
        return {
          ...state,
          resetError: action.payload,
        };
    case UpdateBrandByID.UPDATE_BRAND_RESET:
        return {
          ...state,
          updatedBrand: action.payload,
          resetError: action.payload,
        };
    default:
      return state;
  }
};

export default updatedBrandReducer;
