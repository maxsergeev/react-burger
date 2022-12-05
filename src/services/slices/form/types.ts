//универсальный интерфейс для данных с форм
export interface IUnifyFormData{
    [key: string]: string;
}

//reset-forgot-password
export interface IResetPasswordData {
    password: string,
    token: string,
}
export interface IForgotPasswordData {
    email: string;
}
export interface IFormDataResponse {
    success: boolean;
    message: string;
}

//login
export interface IToken {
    token: string;
}
export interface IAuthData {
    email: string;
    password: string;
}

//register
export interface IUserData{
    email: string;
    name: string;
}

export interface IAuthDataResponse extends IRefreshToken{
    user: IUserData;
}

export interface IRegisterData extends IUserData{
    password: string,
}

//refresh-token
export interface  IRefreshToken {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

//get-user
export interface IGetUser {
    success: boolean;
    user: IUserData;
}

//update-user
export interface IUpdateUser extends IUserData{
    password: string
}

