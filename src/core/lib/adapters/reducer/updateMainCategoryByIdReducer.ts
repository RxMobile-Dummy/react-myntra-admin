import { UpdateMainCategoryActionType } from "../../useCases/actionType/updateMainCategoryByIdActionType";
import { UpdateMainCategoryAction } from "../../useCases/actions/updateMainCategoryByIdAction";

type UserState = {
  data5: any;
  error5: string | undefined;
};

const initialState = {
  data5: undefined,
  error5: undefined,
};

const updateMainCategoryReducer = (
  state: UserState = initialState,
  action: UpdateMainCategoryAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_SUCCESS:
      return {
        ...state,
        data5: action.payload,
      };
    case UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_FAILED:
      return {
        ...state,
        error5: action.payload,
      };
    case UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_RESET:
      return {
        ...state,
        data5: action.payload,
        error5: action.payload,
      };
    default:
      return state;
  }
};

export default updateMainCategoryReducer;
