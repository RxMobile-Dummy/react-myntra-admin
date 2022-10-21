import { DeleteMainCategoryActionType } from "../../useCases/actionType/deleteMainCategoryByIdActionType";
import { DeleteMainCategoryAction } from "../../useCases/actions/deleteMainCategoryByIdAction";

type UserState = {
  data4: any;
  error4: string | undefined;
};

const initialState = {
  data4: undefined,
  error4: undefined,
};

const deleteMainCategoryReducer = (
  state: UserState = initialState,
  action: DeleteMainCategoryAction
): any => {
  switch (action.type) {
    case DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_SUCCESS:
      return {
        ...state,
        data4: action.payload,
      };
    case DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_FAILED:
      return {
        ...state,
        error4: action.payload,
      };
    case DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_RESET:
      return {
        ...state,
        data4: action.payload,
        error4: action.payload,
      };
    default:
      return state;
  }
};

export default deleteMainCategoryReducer;
