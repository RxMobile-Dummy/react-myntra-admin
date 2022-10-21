import { AddCategoryActionType } from "../actionType/addCategoryActionType";

interface AddCategory {
  type: AddCategoryActionType.ADD_CATEGORY_SUCCESS;
  payload: any;
}

interface AddCategoryError {
  type: AddCategoryActionType.ADD_CATEGORY_FAILED;
  payload: any;
}
interface AddCategoryReset {
  type: AddCategoryActionType.ADD_CATEGORY_RESET;
  payload: any;
}

export type AddCategoryAction = AddCategory | AddCategoryError | AddCategoryReset;
