import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { IMovie } from 'src/app/shared/models/models';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public all_movies: IMovie[] = [];

  ngOnInit() {
    this.getAllMovies();
  }


  getAllMovies(){
    this.provider.getAllMovies().then(res => {
      this.all_movies = res;
      console.log(this.all_movies);
    });
  }
}
