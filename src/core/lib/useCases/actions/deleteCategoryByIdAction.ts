import { DeleteCategoryActionType } from "../actionType/deleteCategoryByIdActionType";

interface DeleteCategory {
  type: DeleteCategoryActionType.DELETE_CATEGORY_SUCCESS;
  payload: any;
}

interface DeleteCategoryError {
  type: DeleteCategoryActionType.DELETE_CATEGORY_FAILED;
  payload: any;
}
interface DeleteCategoryReset {
  type: DeleteCategoryActionType.DELETE_CATEGORY_RESET;
  payload: any;
}

export type DeleteCategoryAction =
  | DeleteCategory
  | DeleteCategoryError
  | DeleteCategoryReset;
