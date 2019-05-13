import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ProviderService } from 'src/app/shared/services/provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  
  @Input() authorized: boolean = false;
  @Output() output = new EventEmitter();
  
  ngOnInit() {
  }

  
  logout() {
    this.provider.logout().then(res => {
      this.authorized = false;
      localStorage.clear();
      this.output.emit(false);
      console.log('logout');
    });
  }

}
