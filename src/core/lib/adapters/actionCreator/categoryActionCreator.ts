import { Dispatch } from "redux";
import { CategoryActionType } from "../../useCases/actionType/categoryActionTypes";
import { postRequestGraphQL } from "../../Network/ApiCall";
import { CategoryAction } from "../../useCases/actions/categoryAction";

interface Props {
  categoryname: string;
  maincategoryname: string;
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

  return async (dispatch: Dispatch<CategoryAction>) => {
    console.log("Category called .....", requestData);
    try {
      const data = await postRequestGraphQL(query, requestData);

      const response = data.addProductCategory;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: CategoryActionType.CATEGORY,
          payload: response.data,
        });
      } else {
        dispatch({
          type: CategoryActionType.CATEGORY_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: CategoryActionType.CATEGORY_FAILED,
        payload: error,
      });
    }
  };
};




export const ResetCategoryState = () => {
  return async (dispatch: Dispatch<CategoryAction>) => {
    dispatch({
      type: CategoryActionType.CATEGORY_RESET,
      payload: undefined,
    });
  };
};
