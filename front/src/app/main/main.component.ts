import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public authorized = false;

  public login = '';
  public password = ''; 

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
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
        //getPosts
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      this.authorized = false;
      localStorage.clear();
    });
  }
}
