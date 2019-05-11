import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../shared/services/provider.service'
import { IMovie } from 'src/app/shared/models/models';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public authorized = false;

  public login = '';
  public password = ''; 
  public movies: IMovie[] = [];
  public all_movies: IMovie[] = [];

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    this.getAllMovies();
    
    const token = localStorage.getItem('token');
    if (token) {
      this.authorized = true;
    }

    if (this.authorized) {
      console.log(token);
      this.getMovies();
    }

    
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      console.log(this.login + this.password);
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.authorized = true;
        
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      this.authorized = false;
      localStorage.clear();
    });
  }

  getMovies() {
    this.provider.getMovies().then(res => {
      this.movies = res;
    });
  }

  getAllMovies(){
    this.provider.getAllMovies().then(res => {
      this.all_movies = res;
    });
  }
}
