import { GetCategoryActionType } from "../../useCases/actionType/getAllCategoryActionType";
import { GetCategoryAction } from "../../useCases/actions/getAllCategoryAction";

type UserState = {
  data2: any;
  error2: string | undefined;
};

const initialState = {
  data2: undefined,
  error2: undefined,
};

const getAllCategoryReducer = (
  state: UserState = initialState,
  action: GetCategoryAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case GetCategoryActionType.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        data2: action.payload,
      };
    case GetCategoryActionType.GET_CATEGORY_FAILED:
      return {
        ...state,
        error2: action.payload,
      };
    case GetCategoryActionType.GET_CATEGORY_RESET:
      return {
        ...state,
        data2: action.payload,
        error2: action.payload,
      };
    default:
      return state;
  }
};

export default getAllCategoryReducer;
