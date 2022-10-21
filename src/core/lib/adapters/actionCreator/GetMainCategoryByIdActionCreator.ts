import { Dispatch } from "redux";
import { GetMainCategoryByIdActionType } from "../../useCases/actionType/getMainCategoryByIdActionType";
// import { postRequestGraphQL } from "../../Network/ApiCall";
import { getRequest, postRequestGraphQLAuth } from "../../Network/ApiCall";
import { GetMainCategoryByIdAction } from "../../useCases/actions/getMainCategoryByIdAction";

interface Props {
  productid: string;
  authToken: string;
}

export const GetMainCategoryById = (user: Props) => {
  /////NOT WORKING
  const query = `query GetMainCategoryById($productid: String) { 
    getMainCategoryById(productid: $productid) {
      message
      statusCode
      data {
        mainCategory
        _id
      }
    }
  }`;

  const requestData = {
    productid: user.productid,
  };

  return async (dispatch: Dispatch<GetMainCategoryByIdAction>) => {
    console.log("Get Category by id called .....");
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.getMainCategoryById;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetGetMainCategoryByIdState = () => {
  return async (dispatch: Dispatch<GetMainCategoryByIdAction>) => {
    dispatch({
      type: GetMainCategoryByIdActionType.GET_MAIN_CATEGORY_BYID_RESET,
      payload: undefined,
    });
  };
};
