import { DeleteCategoryActionType } from "../../useCases/actionType/deleteCategoryByIdActionType";
import { DeleteCategoryAction } from "../../useCases/actions/deleteCategoryByIdAction";

type UserState = {
  dltdata3: any;
  dlterror3: string | undefined;
};

const initialState = {
  dltdata3: undefined,
  dlterror3: undefined,
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
        dltdata3: action.payload,
      };
    case DeleteCategoryActionType.DELETE_CATEGORY_FAILED:
      return {
        ...state,
        dlterror3: action.payload,
      };
    case DeleteCategoryActionType.DELETE_CATEGORY_RESET:
      return {
        ...state,
        dltdata3: action.payload,
        dlterror3: action.payload,
      };
    default:
      return state;
  }
};

export default deleteCategoryReducer;
