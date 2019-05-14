import { Component, OnInit } from '@angular/core';
import { IMovie, IUser } from 'src/app/shared/models/models';
import { ProviderService } from 'src/app/shared/services/provider.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private provider:ProviderService) { }

  public movielist:IMovie[] = [];

  public user: IUser = null;

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList(){
    this.provider.getCurUser().then(res => {
      this.user = res;
      console.log(this.user);
      this.user.my_movies = res['my_movies'];
      this.provider.getOwnedMovieList(this.user.id).then(res => {
        console.log(res);
        console.log(res['my_movies']);
        for (let i = 0; i < res['my_movies'].length; i++) {
          const el = res['my_movies'][i];
          
          this.provider.getMovieById(el).then(r => {
            this.movielist.push(r);
          });
        }

        console.log(this.movielist);
      });
   });
  }


  putOwnedMovieList(){
    this.provider.getCurUser().then(res => {
      this.user.my_movies = res['my_movies'];
    });

    this.provider.putOwnedMovieList(this.user.id, this.user.my_movies).then(res => {
      this.user.my_movies = res['my_movies'];
      console.log(this.user);
    });
  }

  deleteFromMovieList(movie: IMovie) {
    this.provider.getCurUser().then(res => {
      this.user = res;
      this.provider.getOwnedMovieList(this.user.id).then(rs => {
        this.user.my_movies = rs['my_movies'];
        const index = this.user.my_movies.indexOf(movie.id);
        this.user.my_movies.splice(index, 1);

        console.log(this.user.my_movies);

        this.provider.putOwnedMovieList(this.user.id, this.user.my_movies).then(res => {
          this.user.my_movies = res['my_movies'];
          console.log(this.user);
          this.movielist = [];
          
          this.getMovieList();
        });

      });
    console.log(res);
    });


    
  }
}
