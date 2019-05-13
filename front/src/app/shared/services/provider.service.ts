import { Injectable, EventEmitter } from '@angular/core';
import {IUser, IAuthResponse, IMovie } from '../models/models';
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

}
