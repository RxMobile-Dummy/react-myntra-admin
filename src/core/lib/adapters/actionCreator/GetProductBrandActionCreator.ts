import { Dispatch } from "redux";
import { getProductBrandActionType } from "../../useCases/actionType/getProductBrandActionType";
// import { postRequestGraphQL } from "../../Network/ApiCall";
import { getRequest, postRequestGraphQLAuth } from "../../Network/ApiCall";
import { GetProductBrandAction } from "../../useCases/actions/getProductBrandAction";

interface Props {
  authToken: string;
}

export const GetProductBrandActionCreator = (user: Props) => {
  /////NOT WORKING
  const query = `query GetAllProductBrands {
    getAllProductBrands {
      message
      statusCode
      data {
        _id
        brandname
        mainCategory {
          mainCategory
        }
        category {
          Categoryname
        }
      }
    }
  }`;

  const requestData = {
    authToken: user.authToken,
  };

  return async (dispatch: Dispatch<GetProductBrandAction>) => {
    // console.log("Get Category by id called .....");
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.getAllProductBrands;
      // console.log("Value of getbrand response is", response);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        dispatch({
          type: getProductBrandActionType.GET_PRODUCT_BRAND_SUCCESS,
          payload: response.data,
        });
        return { status: true, resultData: response.data };
      } else {
        dispatch({
          type: getProductBrandActionType.GET_PRODUCT_BRAND_FAILED,
          payload: response.message,
        });
        return { status: false, resultData: response.data };
      }
    } catch (error) {
      dispatch({
        type: getProductBrandActionType.GET_PRODUCT_BRAND_FAILED,
        payload: error,
      });
      return { status: false, resultData: error };
    }
  };
};
