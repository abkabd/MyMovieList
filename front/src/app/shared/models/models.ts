export interface IUser {
    id: number;
    password: string;
    username: string;
    email: string;
}

export interface IAuthResponse {
    token: string;
}

export interface IMovie {
    id: number;
    title: string;
    rating: number;
    prod_year: number;
    image: ImageBitmap;
    
}