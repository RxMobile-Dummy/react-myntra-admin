import { GetCategoryActionType } from "../../useCases/actionType/getAllCategoryActionType";
import { GetCategoryAction } from "../../useCases/actions/getAllCategoryAction";

type UserState = {
  getdata2: any;
  geterror2: string | undefined;
};

const initialState = {
  getdata2: undefined,
  geterror2: undefined,
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
        getdata2: action.payload,
      };
    case GetCategoryActionType.GET_CATEGORY_FAILED:
      return {
        ...state,
        geterror2: action.payload,
      };
    case GetCategoryActionType.GET_CATEGORY_RESET:
      return {
        ...state,
        getdata2: action.payload,
        geterror2: action.payload,
      };
    default:
      return state;
  }
};

export default getAllCategoryReducer;
