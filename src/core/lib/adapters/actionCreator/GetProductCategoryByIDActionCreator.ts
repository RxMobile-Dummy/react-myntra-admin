import { Dispatch } from "redux";
import { GetProductCategoryByID } from "../../useCases/actionType/getProductCategoryById";
// import { postRequestGraphQL } from "../../Network/ApiCall";
import { getRequest, postRequestGraphQLAuth } from "../../Network/ApiCall";
import { GetProductCategoryByIDAction } from "../../useCases/actions/getProductCategoryByIdAction";

interface Props {
  productid: any;
  authToken: string;
}

export const GetProductCategoryByIDQuery = (user: Props) => {
  /////NOT WORKING
  const query = `query GetMainCategoryById($productid: String) {
    getMainCategoryById(productid: $productid) {
      message
      statusCode
      data {
        category {
          Categoryname
        }
      }
    }
  }`;

  const requestData = {
    productid: user.productid,
  };

  return async (dispatch: Dispatch<GetProductCategoryByIDAction>) => {
    console.log("Get Category by id called .....");
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.getMainCategoryById;
      console.log("Value of response is", response);
      if ((response && response.statusCode === 200) || response.statusCode === 201) {
        dispatch({
          type: GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_SUCCESS,
          payload: response.data,
        });
        return { status : true, resultData : response.data }
      } else {
        dispatch({
          type: GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_FAILED,
          payload: response.message,
        });
        return { status : false, resultData : response.data }

      }
    } catch (error) {
      dispatch({
        type: GetProductCategoryByID.GET_PRODUCT_CATEGORY_BY_ID_FAILED,
        payload: error,
      });
      return { status : false, resultData : error }
    }
  };
};

