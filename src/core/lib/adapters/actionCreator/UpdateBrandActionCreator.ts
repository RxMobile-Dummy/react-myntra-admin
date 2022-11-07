import { Dispatch } from "redux";
import { UpdateBrandByID } from "../../useCases/actionType/updateBrandByID";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { UpdateBrandAction } from "../../useCases/actions/updateBrandAction";

interface Props {
  brandid: string;
  updatedname: string;
  authToken: string;
}

export const UpdateBrand = (user: Props) => {
  const query = `mutation UpdateProductBrandById($brandid: String, $updatedname: String) {
    updateProductBrandById(brandid: $brandid, updatedname: $updatedname) {
      message
      statusCode
      data {
        brandname
      }
    }
  }`;

  const requestData = {
    brandid: user.brandid,
    updatedname: user.updatedname,
  };

  return async (dispatch: Dispatch<UpdateBrandAction>) => {
    // console.log("Update Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.updateProductBrandById;
      // console.log("Value of response is", response);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        dispatch({
          type: UpdateBrandByID.UPDATE_BRAND_SUCCESS,
          payload: response.data,
        });
        return { status: true, resultData: response.data };
      } else {
        dispatch({
          type: UpdateBrandByID.UPDATE_BRAND_FAILED,
          payload: response.message,
        });
        return { status: false, resultData: response.message };
      }
    } catch (error) {
      dispatch({
        type: UpdateBrandByID.UPDATE_BRAND_FAILED,
        payload: error,
      });
      return { status: false, resultData: error };
    }
  };
};
