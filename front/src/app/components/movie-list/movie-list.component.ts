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
    this.getUser();
    this.getMovieList();



    





  }


  getUser(){
    
    console.log(this.user);


  }

  getMovieList(){
    this.provider.getCurUser().then(res => {
      this.user = res;
      console.log(this.user);

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
}
