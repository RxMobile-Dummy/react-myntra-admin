import { AddProductActionType } from "../../useCases/actionType/AddProductActionType";
import { AddProductAction } from "../../useCases/actions/AddProductAction";

type UserState = {
    addProduct: any;
    error: string | undefined;
};

const initialState = {
    addProduct: undefined,
    error: undefined,
};

const addProductReducer = (
    state: UserState = initialState,
    action: AddProductAction
): any => {
    switch (action.type) {
        case AddProductActionType.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                addProduct: action.payload,
            };
        case AddProductActionType.ADD_PRODUCT_FAILED:
            return {
                ...state,
                error: action.payload,
            };
        case AddProductActionType.ADD_PRODUCT_RESET:
            return {
                ...state,
                addProduct: action.payload,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default addProductReducer;
