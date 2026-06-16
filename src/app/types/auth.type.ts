export type UserDataType = {
    username: string;
    password: string;
    expiresInMins?: number;
};

type TokenType = {
    accessToken: string;
    refreshToken: string;
};

type UserInfoType = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
};

export type LoginResponseType = TokenType & UserInfoType;
export type AuthType = UserInfoType & Partial<TokenType>;
