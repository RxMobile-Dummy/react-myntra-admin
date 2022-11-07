import { Dispatch } from "redux";
import { DeleteProductBrandActionType } from "../../useCases/actionType/deleteProductBrandByIdActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { DeleteProductBrandAction } from "../../useCases/actions/deleteProductBrandByIdAction";

interface Props {
  brandid: string;
  authToken: string;
}

export const DeleteBrand = (user: Props) => {
  const query = `query DeleteProductBrandById($brandid: String) {
    deleteProductBrandById(brandid: $brandid) {
      message
      statusCode
      data {
        brandname
      }
    }
  }`;

  const requestData = {
    brandid: user.brandid,
    authToken: user.authToken,
  };

  return async (dispatch: Dispatch<DeleteProductBrandAction>) => {
    console.log("Dispatch Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.deleteProductBrandById;
      console.log("Value of response is", response);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        dispatch({
          type: DeleteProductBrandActionType.DELETE_PRODUCT_BRAND_SUCCESS,
          payload: response.data,
        });
        return { status: true, resultData: response.message };
      } else {
        dispatch({
          type: DeleteProductBrandActionType.DELETE__PRODUCT_BRAND_FAILED,
          payload: response.message,
        });
        return { status: false, resultData: response.message };
      }
    } catch (error) {
      dispatch({
        type: DeleteProductBrandActionType.DELETE__PRODUCT_BRAND_FAILED,
        payload: error,
      });
      return { status: false, resultData: error };
    }
  };
};

export const ResetDeleteBrandState = () => {
  return async (dispatch: Dispatch<DeleteProductBrandAction>) => {
    dispatch({
      type: DeleteProductBrandActionType.DELETE__PRODUCT_BRAND_RESET,
      payload: undefined,
    });
  };
};
