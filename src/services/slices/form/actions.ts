import {actions as resetPassword} from "./slices/reset-password";
import {actions as forgotPassword} from "./slices/forgot-password";
import {actions as register} from "./slices/register";
import {actions as refreshToken} from "./slices/refresh-token";
import {actions as logout} from "./slices/logout";
import {actions as login} from "./slices/login";
import {actions as getUser} from "./slices/get-user";
import {actions as updateUser} from "./slices/update-user";

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