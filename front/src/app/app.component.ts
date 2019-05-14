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
  public to_reg = false;
  public email = '';

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    // localStorage.clear();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token) {
      this.authorized = true;
    }

    if (this.authorized) {
      console.log(token);
    }
  }

  changeReg(){
    this.to_reg = !this.to_reg;
  }
  
  auth() {
    if (this.login !== '' && this.password !== '') {
      console.log(this.login + this.password);
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        // localStorage.setItem('username', res.username);

        this.authorized = true;
        
      });
    }
  }

  reg(){
    if (this.login !== '' && this.password !== '') {
      console.log(this.login + this.password);
      this.provider.createUser(this.login, this.email, this.password).then(res => {
        console.log(res);
        alert('New user created!');
        this.auth();

      });

    }
  }


  



}
