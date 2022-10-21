import { UpdateCategoryActionType } from "../../useCases/actionType/updateCategoryByIdActionType";
import { UpdateCategoryAction } from "../../useCases/actions/updateCategoryByIdAction";

type UserState = {
  data4: any;
  error4: string | undefined;
};

const initialState = {
  data4: undefined,
  error4: undefined,
};

const updateCategoryReducer = (
  state: UserState = initialState,
  action: UpdateCategoryAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case UpdateCategoryActionType.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        data4: action.payload,
      };
    case UpdateCategoryActionType.UPDATE_CATEGORY_FAILED:
      return {
        ...state,
        error4: action.payload,
      };
    case UpdateCategoryActionType.UPDATE_CATEGORY_RESET:
      return {
        ...state,
        data4: action.payload,
        error4: action.payload,
      };
    default:
      return state;
  }
};

export default updateCategoryReducer;
