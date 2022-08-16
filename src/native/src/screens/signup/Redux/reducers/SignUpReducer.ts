import {UserAction, UserModel} from '../actions/UserActions';

type UserState = {
  user: UserModel;
  error: string | undefined;
};

const initialState = {
  user: {} as UserModel,
  error: undefined,
};

const SignUpReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case 'ON_SIGNUP':
      return {
        ...state,
        user: action.payload,
      };
    case 'ON_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {SignUpReducer};
