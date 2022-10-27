import { AddMainCategoryActionType } from "../actionType/addMainCategoryActionsTypes";

interface AddMainCategory {
  type: AddMainCategoryActionType.ADD_MAIN_CATEGORY_SUCCESS;
  payload: any;
}

interface AddMainCategoryError {
  type: AddMainCategoryActionType.ADD_MAIN_CATEGORY_FAILED;
  payload: any;
}
interface AddMainCategoryReset {
  type: AddMainCategoryActionType.ADD_MAIN_CATEGORY_RESET;
  payload: any;
}

export type AddMainCategoryAction =
  | AddMainCategory
  | AddMainCategoryError
  | AddMainCategoryReset;
