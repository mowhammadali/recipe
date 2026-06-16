export type UserDataType = {
    username: string;
    password: string;
    expiresInMins?: number;
};

export type LoginResponseType = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
};
