import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie', component: MovieComponent},
  /*
  {path: 'about', component: AboutComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'signUpStudent', component: SignstudentComponent},
  {path: 'signUpCompany', component: SigncompanyComponent},
  {path: 'internship-element', component: InternshipComponent},
  {path: 'internships', component: InternshipListComponent},
  {path: '**', component: NotFoundComponent},
  */

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
