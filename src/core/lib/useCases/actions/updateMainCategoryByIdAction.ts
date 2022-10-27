import { UpdateMainCategoryActionType } from "../actionType/updateMainCategoryByIdActionType";

interface UpdateMainCategory {
  type: UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_SUCCESS;
  payload: any;
}

interface UpdateMainCategoryError {
  type: UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_FAILED;
  payload: any;
}
interface UpdateMainCategoryReset {
  type: UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_RESET;
  payload: any;
}

export type UpdateMainCategoryAction =
  | UpdateMainCategory
  | UpdateMainCategoryError
  | UpdateMainCategoryReset;
