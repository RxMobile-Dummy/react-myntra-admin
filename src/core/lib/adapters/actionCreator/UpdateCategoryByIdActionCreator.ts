import { Dispatch } from "redux";
import { UpdateCategoryActionType } from "../../useCases/actionType/updateCategoryByIdActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { UpdateCategoryAction } from "../../useCases/actions/updateCategoryByIdAction";

interface Props {
  categoryid: string;
  updatedcategoryname: string;
  authToken: string;
}

export const UpdateCategory = (user: Props) => {
  const query = `mutation UpdateProductCategoryById($categoryid: String, $updatedcategoryname: String) {
    updateProductCategoryById(categoryid: $categoryid, updatedcategoryname: $updatedcategoryname) {
      message
      statusCode
      data {
        Categoryname
        _id
      }
    }
  }`;

  const requestData = {
    categoryid: user.categoryid,
    updatedcategoryname: user.updatedcategoryname,
  };

  return async (dispatch: Dispatch<UpdateCategoryAction>) => {
    console.log("Update Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.updateProductCategoryById;
      console.log("Value of response is", response);
      if ((response && response.statusCode === 200) || response.statusCode === 201) {
        dispatch({
          type: UpdateCategoryActionType.UPDATE_CATEGORY_SUCCESS,
          payload: response.data,
        });
        return { status : true, resultData : response.data }
      } else {
        dispatch({
          type: UpdateCategoryActionType.UPDATE_CATEGORY_FAILED,
          payload: response.message,
        });
        return { status : false, resultData : response.message }
      }
    } catch (error) {
      dispatch({
        type: UpdateCategoryActionType.UPDATE_CATEGORY_FAILED,
        payload: error,
      });
      return { status : false, resultData : error }
    }
  };
};

export const ResetUpdateCategoryState = () => {
  return async (dispatch: Dispatch<UpdateCategoryAction>) => {
    dispatch({
      type: UpdateCategoryActionType.UPDATE_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
