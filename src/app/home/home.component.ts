import { Component } from '@angular/core';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  attributionHTML: string = '';
  constructor(private service: MarvelService,
    ) { }
  ngOnInit(){
    this.attributionHTML=this.service.attributionHTML;
  }

}
