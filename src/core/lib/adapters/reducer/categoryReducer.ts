import { CategoryActionType } from "../../useCases/actionType/categoryActionTypes";
import { CategoryAction } from "../../useCases/actions/categoryAction";


type UserState = {
  data: any;
  error: string | undefined;
};

const initialState = {
  data: undefined,
  error: undefined,
};

const categoryReducer = (state: UserState = initialState, action: CategoryAction): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case CategoryActionType.CATEGORY:
      return {
        ...state,
        data: action.payload,
      };
    case CategoryActionType.CATEGORY_FAILED:
        return {
          ...state,
          error: action.payload,
        };
    case CategoryActionType.CATEGORY_RESET:
        return {
          ...state,
          data: action.payload,
          error: action.payload,
        };
    default:
      return state;
  }
};

export default categoryReducer;
