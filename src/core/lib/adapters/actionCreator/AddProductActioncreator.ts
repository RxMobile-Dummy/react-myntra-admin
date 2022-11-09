import { Dispatch } from "redux";
import { AddProductActionType } from "../../useCases/actionType/AddProductActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { AddProductAction } from "../../useCases/actions/AddProductAction";

interface Props {
  maincategory: string;
  category: string;
  brand: string;
  productname: string;
  productdetails: string;
  productImage: string[];
  productSize: string;
  deliverable: string;
  returnable: boolean;
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
    maincategory: user.maincategory,
    category: user.category,
    brand: user.brand,
    productname: user.productname,
    productdetails: user.productdetails,
    productImage: user.productImage,
    productSize: user.productSize,
    deliverable: user.deliverable,
    returnable: user.returnable,
    authToken: user.authToken,
  };

  return async (dispatch: Dispatch<AddProductAction>) => {
    console.log("Add Product called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.addProduct;
      console.log("Value of response is", response);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        dispatch({
          type: AddProductActionType.ADD_PRODUCT_SUCCESS,
          payload: response.message,
        });
        return { status: true, resultData: response.message };
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
