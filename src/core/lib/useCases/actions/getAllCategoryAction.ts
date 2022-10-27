import { GetCategoryActionType } from "../actionType/getAllCategoryActionType";

interface GetCategory {
  type: GetCategoryActionType.GET_CATEGORY_SUCCESS;
  payload: any;
}

interface GetCategoryError {
  type: GetCategoryActionType.GET_CATEGORY_FAILED;
  payload: any;
}
interface GetCategoryReset {
  type: GetCategoryActionType.GET_CATEGORY_RESET;
  payload: any;
}

export type GetCategoryAction = GetCategory | GetCategoryError | GetCategoryReset;
