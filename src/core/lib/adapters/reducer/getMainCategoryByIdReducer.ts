import { GetMainCategoryByIdActionType } from "../../useCases/actionType/getMainCategoryByIdActionType";
import { GetMainCategoryByIdAction } from "../../useCases/actions/getMainCategoryByIdAction";

type UserState = {
  data3: any;
  error3: string | undefined;
};

const initialState = {
  data3: undefined,
  error3: undefined,
};

const getMainCategoryByIdReducer = (
  state: UserState = initialState,
  action: GetMainCategoryByIdAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_SUCCESS:
      return {
        ...state,
        data3: action.payload,
      };
    case GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_FAILED:
      return {
        ...state,
        error3: action.payload,
      };
    case GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_RESET:
      return {
        ...state,
        data3: action.payload,
        error3: action.payload,
      };
    default:
      return state;
  }
};

export default getMainCategoryByIdReducer;
