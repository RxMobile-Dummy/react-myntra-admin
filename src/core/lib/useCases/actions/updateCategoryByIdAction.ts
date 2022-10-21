import { UpdateCategoryActionType } from "../actionType/updateCategoryByIdActionType";

interface UpdateCategory {
  type: UpdateCategoryActionType.UPDATE_CATEGORY_SUCCESS;
  payload: any;
}

interface UpdateCategoryError {
  type: UpdateCategoryActionType.UPDATE_CATEGORY_FAILED;
  payload: any;
}
interface UpdateCategoryReset {
  type: UpdateCategoryActionType.UPDATE_CATEGORY_RESET;
  payload: any;
}

export type UpdateCategoryAction =
  | UpdateCategory
  | UpdateCategoryError
  | UpdateCategoryReset;
