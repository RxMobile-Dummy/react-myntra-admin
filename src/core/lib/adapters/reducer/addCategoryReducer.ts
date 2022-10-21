import { AddCategoryActionType } from "../../useCases/actionType/addCategoryActionType";
import { AddCategoryAction } from "../../useCases/actions/addCategoryAction";

type UserState = {
  data: any;
  error: string | undefined;
};

const initialState = {
  data: undefined,
  error: undefined,
};

const addCategoryReducer = (
  state: UserState = initialState,
  action: AddCategoryAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case AddCategoryActionType.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case AddCategoryActionType.ADD_CATEGORY_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case AddCategoryActionType.ADD_CATEGORY_RESET:
      return {
        ...state,
        data: action.payload,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default addCategoryReducer;
