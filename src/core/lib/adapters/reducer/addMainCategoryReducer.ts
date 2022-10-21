import { AddMainCategoryActionType } from "../../useCases/actionType/addMainCategoryActionsTypes";
import { AddMainCategoryAction } from "../../useCases/actions/addMainCategoryAction";

type UserState = {
  data: any;
  error: string | undefined;
};

const initialState = {
  data: undefined,
  error: undefined,
};

const addMainCategoryReducer = (
  state: UserState = initialState,
  action: AddMainCategoryAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case AddMainCategoryActionType.ADD_MAIN_CATEGORY_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case AddMainCategoryActionType.ADD_MAIN_CATEGORY_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case AddMainCategoryActionType.ADD_MAIN_CATEGORY_RESET:
      return {
        ...state,
        data: action.payload,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default addMainCategoryReducer;
