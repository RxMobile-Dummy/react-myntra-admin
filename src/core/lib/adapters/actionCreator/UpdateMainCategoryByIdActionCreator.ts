import { Dispatch } from "redux";
import { UpdateMainCategoryActionType } from "../../useCases/actionType/updateMainCategoryByIdActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { UpdateMainCategoryAction } from "../../useCases/actions/updateMainCategoryByIdAction";

interface Props {
  productid: string;
  upatedname: string;
  authToken: string;
}

export const UpdateMainCategory = (user: Props) => {
  const query = `mutation UpdateMainCategoryById($productid: String, $upatedname: String) {
    updateMainCategoryById(productid: $productid, upatedname: $upatedname) {
      message
      statusCode
      data {
        mainCategory
      }
    }
  }`;

  const requestData = {
    productid: user.productid,
    upatedname: user.upatedname,
  };

  return async (dispatch: Dispatch<UpdateMainCategoryAction>) => {
    console.log("Update Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.updateMainCategoryById;
      console.log("Value of response is", response);
      if (response && response.statusCode === 201) {
        dispatch({
          type: UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_SUCCESS,
          payload: response.data,
        });
        return { status : true, resultData : response.data }
      } else {
        dispatch({
          type: UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_FAILED,
          payload: response.message,
        });
        return { status : false, resultData : response.message }
      }
    } catch (error) {
      dispatch({
        type: UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_FAILED,
        payload: error,
      });
      return { status : false, resultData : error }
    }
  };
};

export const ResetUpdateMainCategoryState = () => {
  return async (dispatch: Dispatch<UpdateMainCategoryAction>) => {
    dispatch({
      type: UpdateMainCategoryActionType.UPDATE_MAIN_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
