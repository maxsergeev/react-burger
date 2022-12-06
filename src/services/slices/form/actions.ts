import {actions as resetPassword} from "./slices/resetPasswordSlice";
import {actions as forgotPassword} from "./slices/forgotPasswordSlice";
import {actions as register} from "./slices/registerSlice";
import {actions as refreshToken} from "./slices/refreshTokenSlice";
import {actions as logout} from "./slices/logoutSlice";
import {actions as login} from "./slices/loginSlice";
import {actions as getUser} from "./slices/getUserSlice";
import {actions as updateUser} from "./slices/updateUserSlice";

export interface IFormActions {
    resetPassword: typeof resetPassword;
    forgotPassword: typeof forgotPassword;
    register: typeof register;
    refreshToken: typeof refreshToken;
    logout: typeof logout;
    login: typeof login;
    getUser: typeof getUser;
    updateUser: typeof updateUser;
}

export const actions: IFormActions = {
    resetPassword,
    forgotPassword,
    register,
    refreshToken,
    logout,
    login,
    getUser,
    updateUser,
}

export default actions;