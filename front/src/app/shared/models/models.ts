export interface IUser {
    id: number;
    password: string;
    username: string;
    email: string;
    my_movies: number[];
}

export interface IAuthResponse {
    token: string;
    username: string;
}

export interface IReview {
    id: number;
    text: string;
    created_by_id: number;
}

export interface IMovie {
    id: number;
    title: string;
    rating: number;
    prod_year: number;
    image: ImageBitmap;
    reviews: IReview[];
}

