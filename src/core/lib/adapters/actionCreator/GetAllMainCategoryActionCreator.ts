import { Dispatch } from "redux";
import { GetAllMainCategoryActionType } from "../../useCases/actionType/getAllMainCategoryActionType";
// import { postRequestGraphQL } from "../../Network/ApiCall";
import { getRequest } from "../../Network/ApiCall";
import { GetAllMainCategoryAction } from "../../useCases/actions/getAllMainCategoryAction";

// interface Props {
//   categoryid: string;
// }

export const GetAllMainCategory = () => {
  const query = `query GetAllMainCategory {
    getAllMainCategory {
      message
      statusCode
      data {
        mainCategory
        category {
          Categoryname
        }
      }
    }
  }`;

  // const requestData = {
  //   categoryid: user.categoryid,
  // };

  return async (dispatch: Dispatch<GetAllMainCategoryAction>) => {
    console.log("Get Category called .....");
    try {
      const data = await getRequest(query);

      const response = data.getAllMainCategory;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: GetAllMainCategoryActionType.GET_MAIN_CATEGORY_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: GetAllMainCategoryActionType.GET_MAIN_CATEGORY_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: GetAllMainCategoryActionType.GET_MAIN_CATEGORY_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetGetAllMainCategoryState = () => {
  return async (dispatch: Dispatch<GetAllMainCategoryAction>) => {
    dispatch({
      type: GetAllMainCategoryActionType.GET_MAIN_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
