import { Dispatch } from "redux";
import { UpdateCategoryActionType } from "../../useCases/actionType/updateCategoryByIdActionType";
import { postRequestGraphQL } from "../../Network/ApiCall";
import { UpdateCategoryAction } from "../../useCases/actions/updateCategoryByIdAction";

interface Props {
  categoryid: string;
  updatedcategoryname: string;
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
      const data = await postRequestGraphQL(query, requestData);

      const response = data.updateProductCategoryById;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: UpdateCategoryActionType.UPDATE_CATEGORY_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: UpdateCategoryActionType.UPDATE_CATEGORY_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: UpdateCategoryActionType.UPDATE_CATEGORY_FAILED,
        payload: error,
      });
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
