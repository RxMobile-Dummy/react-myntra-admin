import { addProductBrand } from "../../useCases/actionType/AddProductBrandActionTypes";
import { AddProductBrandAction } from "../../useCases/actions/addProductBrandAction";

type UserState = {
    addBrand: any;
    error: string | undefined;
};

const initialState = {
    addBrand: undefined,
    error: undefined,
};

const addProductBrandReducer = (
    state: UserState = initialState,
    action: AddProductBrandAction
): any => {
    // console.log("action payload:", action.payload);
    switch (action.type) {
        case addProductBrand.ADD_PRODUCT_BRAND_SUCCESS:
            return {
                ...state,
                addBrand: action.payload,
            };
        case addProductBrand.ADD_PRODUCT_BRAND_FAILED:
            return {
                ...state,
                error: action.payload,
            };
        case addProductBrand.ADD_PRODUCT_BRAND_RESET:
            return {
                ...state,
                addBrand: action.payload,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default addProductBrandReducer;
