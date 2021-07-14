import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    this.scrollToHome()

  }
  scrollToHome(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  scrollToMotivation(){
    var scrollDiv = document.getElementById("motivation");
    let scroll;
    scrollDiv !== null ? scroll = scrollDiv.offsetTop : '';
    window.scrollTo({ top: scroll, behavior: 'smooth'});

  }
  scrollToComparision(){
    var scrollDiv = document.getElementById("comparision");
    let scroll;
    scrollDiv !== null ? scroll = scrollDiv.offsetTop : '';
    window.scrollTo({ top: scroll, behavior: 'smooth'});
  }
  scrollToList(){
    var scrollDiv = document.getElementById("list");
    let scroll;
    scrollDiv !== null ? scroll = scrollDiv.offsetTop : '';
    window.scrollTo({ top: scroll, behavior: 'smooth'});
  }

}
