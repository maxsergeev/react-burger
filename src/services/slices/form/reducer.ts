import {combineReducers} from "redux";
import forgotPasswordSlice, {IForgotPasswordState} from "./slices/forgotPasswordSlice";
import resetPasswordSlice, {IResetPasswordState} from "./slices/resetPasswordSlice";
import registerSlice, {IRegisterState} from "./slices/registerSlice";
import loginSlice, {ILoginState} from "./slices/loginSlice";
import logoutSlice, {ILogoutState} from "./slices/logoutSlice";
import refreshTokenSlice, {IRefreshTokenState} from "./slices/refreshTokenSlice";
import getUserSlice, {IGetUserState} from "./slices/getUserSlice";
import updateUserSlice, {IUpdateUserState} from "./slices/updateUserSlice";
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
    forgotPassword: forgotPasswordSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
    register: registerSlice.reducer,
    login: loginSlice.reducer,
    logout: logoutSlice.reducer,
    refreshToken: refreshTokenSlice.reducer,
    getUser: getUserSlice.reducer,
    updateUser: updateUserSlice.reducer,
})

export default reducer;