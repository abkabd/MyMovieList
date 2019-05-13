import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../shared/services/provider.service'
import { IMovie } from 'src/app/shared/models/models';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  public str: any = 'http://localhost:8000';

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    
  }

}
