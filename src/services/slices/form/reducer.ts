import {combineReducers} from "redux";
import forgotPassword, {IForgotPasswordState} from "./slices/forgot-password";
import resetPassword, {IResetPasswordState} from "./slices/reset-password";
import register, {IRegisterState} from "./slices/register";
import login, {ILoginState} from "./slices/login";
import logout, {ILogoutState} from "./slices/logout";
import refreshToken, {IRefreshTokenState} from "./slices/refresh-token";
import getUser, {IGetUserState} from "./slices/get-user";
import updateUser, {IUpdateUserState} from "./slices/update-user";
export interface IFormReducer {
    forgotPassword: IForgotPasswordState;
    resetPassword: IResetPasswordState;
    register: IRegisterState;
    login: ILoginState;
    logout: ILogoutState;
    refreshToken: IRefreshTokenState;
    getUser: IGetUserState;
    updateUser: IUpdateUserState;
}

const reducer = combineReducers<IFormReducer>({
    forgotPassword: forgotPassword.reducer,
    resetPassword: resetPassword.reducer,
    register: register.reducer,
    login: login.reducer,
    logout: logout.reducer,
    refreshToken: refreshToken.reducer,
    getUser: getUser.reducer,
    updateUser: updateUser.reducer,
})

export default reducer;