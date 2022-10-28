import { Dispatch } from "redux";
import { AddMainCategoryActionType } from "../../useCases/actionType/addMainCategoryActionsTypes";
import { postRequestGraphQL, postRequestGraphQLAuth } from "../../Network/ApiCall";
import { AddMainCategoryAction } from "../../useCases/actions/addMainCategoryAction";

interface Props {
  maincategoryName: string;
  authToken:string
}

export const AddMainCategory = (user: Props) => {
  const query = `mutation AddMainCategory($maincategoryName: String!) {
    addMainCategory(MaincategoryName: $maincategoryName) {
      message
      statusCode
      data {
        _id
        mainCategory
        category {
          Categoryname
        }
      }
    }
  }`;

  const requestData = {
    maincategoryName: user.maincategoryName,
    authToken: user.authToken
  };

  return async (dispatch: Dispatch<AddMainCategoryAction>) => {
    console.log("Add Main Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(query, requestData, user.authToken);

      const response = data.addMainCategory;
      console.log("Value of response is", response);
      if ((response && response.statusCode === 200) || (response.statusCode === 201)) {
        dispatch({
          type: AddMainCategoryActionType.ADD_MAIN_CATEGORY_SUCCESS,
          payload: response.data,
        });
        return { status : true, resultData : response.data }
      } else {
        dispatch({
          type: AddMainCategoryActionType.ADD_MAIN_CATEGORY_FAILED,
          payload: response.message,
        });
        return { status : false, resultData : response.message }
      }
    } catch (error) {
      dispatch({
        type: AddMainCategoryActionType.ADD_MAIN_CATEGORY_FAILED,
        payload: error,
      });
      return { status : false, resultData : error }
    }
  };
};

export const ResetAddMainCategoryState = () => {
  return async (dispatch: Dispatch<AddMainCategoryAction>) => {
    dispatch({
      type: AddMainCategoryActionType.ADD_MAIN_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
