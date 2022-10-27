// import { Dispatch } from "redux";
// import { AddMainCategoryActionType } from "../../useCases/actionType/addMainCategoryActionsTypes";
// import { postRequestGraphQL } from "../../Network/ApiCall";
// import { Action } from "../../useCases/actions";

// interface Props {
//     id: string;
//     category: string;
//     name: string;
// }

// export const Login = (user: Props) => {
//     const query = `mutation subcategoryAdminCall($id: String!, $name: String!, $subCategory : String!) {
//     subcategoryAdmin(id: $id,  name: $name, subCategory:$category) {
//     statusCode
//     message
//     data {
//        _id
//     }
//     }
//   }`;

//     const requestData = {
//         id: user.id,
//         category: user.category,
//         name: user.name
//     };

//     return async (dispatch: Dispatch<Action>) => {
//         // console.log("Login called .....", requestData);
//         try {
//             const data = await postRequestGraphQL(query, requestData);

//             //   console.log("login response data", data);
//             const response = data.subCategoryAdmin;
//             // console.log("Value of response is", response);
//             if (response && response.statusCode === 200) {
//                 dispatch({
//                     type: ActionType.SUB_CATEGORY,
//                     payload: response.data,
//                 });
//             } else {
//                 dispatch({
//                     type: ActionType.SUB_CATEGORY_FAILED,
//                     payload: response.message,
//                 });
//             }
//         } catch (error) {
//             dispatch({
//                 type: ActionType.SUB_CATEGORY_FAILED,
//                 payload: error,
//             });
//         }
//     };
// };

// export const ResetLoginState = () => {
//     return async (dispatch: Dispatch<Action>) => {
//         dispatch({
//             type: ActionType.SUB_CATEGORY_RESET,
//             payload: undefined,
//         });
//     };
// };
