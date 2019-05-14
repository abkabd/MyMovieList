import { Injectable, EventEmitter } from '@angular/core';
import {IUser, IAuthResponse, IMovie, IReview } from '../models/models';
import {HttpClient, HttpParams} from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public movieFromMovies;

  constructor(http: HttpClient) {
    super(http);
  }
  
  sendMovie(movie: IMovie) {
    this.movieFromMovies = movie;
    localStorage.setItem('movieFromMovies', JSON.stringify(movie));
  }

  auth(login: string, password: string): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

  getMovies(): Promise<IMovie[]> {
    return this.get('http://localhost:8000/api/my_movies/', {});
  }

  getAllMovies(): Promise<IMovie[]>{
    return this.get('http://localhost:8000/api/movies/', {});
  }

  getUser(id: number): Promise<IUser>{
    return this.get(`http://localhost:8000/api/customers/${id}/`, {});
  }

  getCurUser():Promise<IUser>{
    return this.get('http://localhost:8000/api/customers/current/', {});
  }

  getOwnedMovieList(userId: number):Promise<number[]>{
    return this.get(`http://localhost:8000/api/customers/${userId}/my_movies/`, {})
  }

  postReview(movieId: number, userId: number, text: string):Promise<IReview>{
    return this.post(`http://localhost:8000/api/movies/${movieId}/reviews/`, {
      text: text,
      movie_id: movieId,
      created_by_id: userId
    })
  }

  getMovieById(movieId: number): Promise<IMovie>{
    return this.get(`http://localhost:8000/api/movies/${movieId}/`, {});
  }
}
