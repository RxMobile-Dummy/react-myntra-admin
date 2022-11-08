import { Dispatch } from "redux";
import { AddProductActionType } from "../../useCases/actionType/AddProductActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { AddProductAction } from "../../useCases/actions/AddProductAction";

interface Props {
    productdetails: string,
    productname: string,
    productImage: any,
    deliverable: any,
    returnable: any,
    brand: any,
    category: any,
    maincategory: any,
    productSize: any
    authToken: string;
}

export const AddProduct = (user: Props) => {
  const query = `mutation AddProduct($productname: String!, $productdetails: String, $productImage: [String], $deliverable: String, $returnable: Boolean, $brand: String, $category: String, $maincategory: String, $productSize: String) {
    addProduct(Productname: $productname, Productdetails: $productdetails, ProductImage: $productImage, Deliverable: $deliverable, Returnable: $returnable, Brand: $brand, Category: $category, Maincategory: $maincategory, ProductSize: $productSize) {
      message
      statusCode
    }
  }`;

  const requestData = {
    productdetails: user.productdetails,
    productname: user.productname,
    productImage: user.productImage,
    deliverable: user.deliverable,
    returnable: user.returnable,
    brand: user.brand,
    category: user.category,
    maincategory: user.maincategory,
    productSize: user.productSize,
    authToken: user.authToken
  };

  return async (dispatch: Dispatch<AddProductAction>) => {
    // console.log("Add Main Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.addMainCategory;
      // console.log("Value of response is", response);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        dispatch({
          type: AddProductActionType.ADD_PRODUCT_SUCCESS,
          payload: response.data,
        });
        return { status: true, resultData: response.data };
      } else {
        dispatch({
          type: AddProductActionType.ADD_PRODUCT_FAILED,
          payload: response.message,
        });
        return { status: false, resultData: response.message };
      }
    } catch (error) {
      dispatch({
        type: AddProductActionType.ADD_PRODUCT_FAILED,
        payload: error,
      });
      return { status: false, resultData: error };
    }
  };
};

