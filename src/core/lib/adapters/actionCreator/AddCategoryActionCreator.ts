import { Dispatch } from "redux";
import { AddCategoryActionType } from "../../useCases/actionType/addCategoryActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { AddCategoryAction } from "../../useCases/actions/addCategoryAction";

interface Props {
  categoryname: string;
  maincategoryname: string;
  authToken: string;
}

export const AddCategory = (user: Props) => {
  const query = `mutation AddProductCategory($maincategoryname: String, $categoryname: String) {
    addProductCategory(maincategoryname: $maincategoryname, categoryname: $categoryname) {
      message
      statusCode
      data {
        _id
        Categoryname
        mainCategory {
          mainCategory
        }
      }
    }
  }`;

  const requestData = {
    categoryname: user.categoryname,
    maincategoryname: user.maincategoryname,
  };

  return async (dispatch: Dispatch<AddCategoryAction>) => {
    // console.log("Add Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.addProductCategory;
      // console.log("Value of response is", response);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        dispatch({
          type: AddCategoryActionType.ADD_CATEGORY_SUCCESS,
          payload: response.data,
        });
        return { status: true, resultData: response.data };
      } else {
        dispatch({
          type: AddCategoryActionType.ADD_CATEGORY_FAILED,
          payload: response.message,
        });
        return { status: false, resultData: response.message };
      }
    } catch (error) {
      dispatch({
        type: AddCategoryActionType.ADD_CATEGORY_FAILED,
        payload: error,
      });
      return { status: false, resultData: error };
    }
  };
};

export const ResetAddCategoryState = () => {
  return async (dispatch: Dispatch<AddCategoryAction>) => {
    dispatch({
      type: AddCategoryActionType.ADD_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
