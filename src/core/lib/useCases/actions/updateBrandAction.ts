import { UpdateBrandByID } from "../actionType/updateBrandByID";

interface UpdateBrandSuccess {
  type: UpdateBrandByID.UPDATE_BRAND_SUCCESS;
  payload: any;
}

export interface UpdateBrandError {
  readonly type: UpdateBrandByID.UPDATE_BRAND_FAILED;
  payload: any;
}

export interface UpdateBrandReset {
  readonly type: UpdateBrandByID.UPDATE_BRAND_RESET;
  payload: any;
}

export type UpdateBrandAction =  UpdateBrandSuccess | UpdateBrandError | UpdateBrandReset;
