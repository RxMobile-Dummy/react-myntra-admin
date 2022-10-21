import { GetMainCategoryByIdActionType } from "../actionType/getMainCategoryByIdActionType";

interface GetMainCategoryById {
  type: GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_SUCCESS;
  payload: any;
}

interface GetAllMainCategoryByIdError {
  type: GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_FAILED;
  payload: any;
}
interface GetAllMainCategoryByIdReset {
  type: GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_RESET;
  payload: any;
}

export type GetMainCategoryByIdAction =
  | GetMainCategoryById
  | GetAllMainCategoryByIdError
  | GetAllMainCategoryByIdReset;
