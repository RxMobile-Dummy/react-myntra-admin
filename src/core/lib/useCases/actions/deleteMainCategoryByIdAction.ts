import { DeleteMainCategoryActionType } from "../actionType/deleteMainCategoryByIdActionType";

interface DeleteMainCategory {
  type: DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_SUCCESS;
  payload: any;
}

interface DeleteMainCategoryError {
  type: DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_FAILED;
  payload: any;
}
interface DeleteMainCategoryReset {
  type: DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_RESET;
  payload: any;
}

export type DeleteMainCategoryAction =
  | DeleteMainCategory
  | DeleteMainCategoryError
  | DeleteMainCategoryReset;
