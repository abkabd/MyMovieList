import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { IMovie, IUser } from 'src/app/shared/models/models';
import { timeout } from 'q';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public text: string = '';
  public movie: IMovie;
  public reviews:Object[] = [];
  private review = [];
  public user: IUser = null;
  ngOnInit() {
    this.getMovie();
    this.provider.getCurUser().then(res => {
       this.user = res;
       console.log(this.user);
    });

    console.log(this.movie.reviews);

    for (let i = 0; i < this.movie.reviews.length; i++) {

      const el = this.movie.reviews[i];

      this.provider.getUser(el.created_by_id).then(res => {
        this.review['user'] = res.username;
        this.review['text'] = el.text;

        console.log(this.review);

        this.reviews.push(this.review);
        this.review = [];
      });
      
      
    }

    console.log(this.reviews);
  }

  getMovie()
  {
      this.movie = JSON.parse(localStorage.getItem('movieFromMovies'));
      console.log("recieve " + this.movie.title);
  }

  getOwnedMovieList(){
    this.provider.getOwnedMovieList(this.user.id).then(res => {
      
    });
  }

  postReview(){
    this.provider.postReview(this.movie.id, this.user.id, this.text).then(res => {
      this.review['user'] = this.user.username;
      this.review['text'] = res.text;
      this.reviews.push(this.review);
    });

    this.text = '';
  }

}
