import { Dispatch } from "redux";
import { addProductBrand } from "../../useCases/actionType/AddProductBrandActionTypes";
import { postRequestGraphQL, postRequestGraphQLAuth } from "../../Network/ApiCall";
import { AddProductBrandAction } from "../../useCases/actions/addProductBrandAction";

interface Props {
    mainCategory: string,
    category: string,
    brandname: string
  authToken:string
}

export const AddProductBrand = (user: Props) => {
  const query = `mutation AddProductBrand($mainCategory: String, $category: String, $brandname: String) {
    addProductBrand(mainCategory: $mainCategory, category: $category, brandname: $brandname) {
      message
      statusCode
      data {
        brandname
      }
    }
  }`;

  const requestData = {
    mainCategory: user.mainCategory,
    category : user.category,
    brandname : user.brandname,
    authToken: user.authToken
  };

  return async (dispatch: Dispatch<AddProductBrandAction>) => {
    console.log("Add Main Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(query, requestData, user.authToken);

      const response = data.addProductBrand;
      console.log("Value of response is", response);
      if ((response && response.statusCode === 200) || (response.statusCode === 201)) {
        dispatch({
          type: addProductBrand.ADD_PRODUCT_BRAND_SUCCESS,
          payload: response.data,
        });
        return { status : true, resultData : response.data }
      } else {
        dispatch({
          type: addProductBrand.ADD_PRODUCT_BRAND_FAILED,
          payload: response.message,
        });
        return { status : false, resultData : response.message }
      }
    } catch (error) {
      dispatch({
        type: addProductBrand.ADD_PRODUCT_BRAND_FAILED,
        payload: error,
      });
      return { status : false, resultData : error }
    }
  };
};

