import { CategoryActionType } from "../../useCases/actionType/categoryActionTypes";

interface Category {
  type: CategoryActionType.CATEGORY;
  payload: any;
}

interface CategoryError {
  type: CategoryActionType.CATEGORY_FAILED;
  payload: any;
}
interface CategoryReset {
  type: CategoryActionType.CATEGORY_RESET;
  payload: any;
}

export type CategoryAction =  Category | CategoryError | CategoryReset;

