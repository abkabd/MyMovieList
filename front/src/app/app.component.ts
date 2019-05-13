import { Component } from '@angular/core';
import { IMovie } from './shared/models/models';
import { ProviderService } from './shared/services/provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front';

  public authorized = false;
  public login = '';
  public password = ''; 

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    localStorage.clear();
    const token = localStorage.getItem('token');
    if (token) {
      this.authorized = true;
    }

    if (this.authorized) {
      console.log(token);
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


  



}
