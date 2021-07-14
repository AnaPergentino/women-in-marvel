import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})
export class MotivationComponent implements OnInit {
  img:string = '';
  description = '';
  title = '';

  constructor(private service: MarvelService) { }
  ngOnInit(): void {
    this.getComicWomenOfMarvel();
  }
  getComicWomenOfMarvel(){
    this.service.getComicByTitleStart('Women of Marvel Vol. 2').toPromise().then(
      (response) => {
          for (let comic of response['data']['results']) {
            this.img =comic['thumbnail']['path'] +
             "." + comic['thumbnail']['extension']
             this.description = comic['description']
             this.title = comic['title']
          }
      }
    )
  }
}
