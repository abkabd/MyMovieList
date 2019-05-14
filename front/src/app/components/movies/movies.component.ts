import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { IMovie, IUser } from 'src/app/shared/models/models';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public all_movies: IMovie[] = [];
  public str: any = 'http://localhost:8000';
  public user: IUser = null;
  ngOnInit() {
    this.getAllMovies();
  }


  getAllMovies(){
    this.provider.getAllMovies().then(res => {
      this.all_movies = res;
      console.log(this.all_movies);
    });
  }

  sendMovie(movie: IMovie) {
    this.provider.sendMovie(movie);
    console.log("send " + movie.title);
  }

  addToMovieList(movie: IMovie) {
    this.provider.getCurUser().then(res => {
      this.user = res;
      this.provider.getOwnedMovieList(this.user.id).then(rs => {
        this.user.my_movies = rs['my_movies'];
        this.user.my_movies.push(movie.id);
        console.log(rs);

        this.provider.putOwnedMovieList(this.user.id, this.user.my_movies).then(res => {
          this.user.my_movies = res['my_movies'];
          console.log(this.user);
        });

      });
    console.log(res);
    });


    
  }


 
}
