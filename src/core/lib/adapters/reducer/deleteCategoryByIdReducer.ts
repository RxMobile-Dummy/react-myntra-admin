import { DeleteCategoryActionType } from "../../useCases/actionType/deleteCategoryByIdActionType";
import { DeleteCategoryAction } from "../../useCases/actions/deleteCategoryByIdAction";

type UserState = {
  data3: any;
  error3: string | undefined;
};

const initialState = {
  data3: undefined,
  error3: undefined,
};

const deleteCategoryReducer = (
  state: UserState = initialState,
  action: DeleteCategoryAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case DeleteCategoryActionType.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        data3: action.payload,
      };
    case DeleteCategoryActionType.DELETE_CATEGORY_FAILED:
      return {
        ...state,
        error3: action.payload,
      };
    case DeleteCategoryActionType.DELETE_CATEGORY_RESET:
      return {
        ...state,
        data3: action.payload,
        error3: action.payload,
      };
    default:
      return state;
  }
};

export default deleteCategoryReducer;
