import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { MarvelService } from './services/marvel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private service: MarvelService,
    private localStorage: LocalStorageService) { }
  title = 'Desafio Angular';
  loaded: boolean = false;

  ngOnInit(): void {
    this.getFemaleCharacters();
    this.setLocalLoaded();
  }
  ngAfterViewInit() {
  }
  getFemaleCharacters() {
    if (Object.keys(this.localStorage.get('femaleCharacters')).length != 0) {
      this.service.femaleCharacters = this.localStorage.get('femaleCharacters')
      this.setLoadedinService(true);
      this.setLocalLoaded();
    }
    else {
      this.service.requestDataFromMultipleSources().toPromise().then(
        (response) => {
          this.setAttribution(response[0]);
          for (let resp of response) {
            for (let character of resp['data']['results']) {
              this.service.femaleCharacters.push(character);
            }
          }
          this.sortCharacters();
          this.localStorage.set('femaleCharacters', this.service.femaleCharacters)
          this.setLoadedinService(true);
          this.setLocalLoaded();
        }
      )
    }
  }
  setAttribution(response: { [x: string]: string; }) {
    this.service.attributionHTML = response['attributionHTML'];
  }
  sortCharacters() {
    this.service.femaleCharacters.sort((a, b) => a.name > b.name ? 1 : -1)
  }
  setLocalLoaded() {
    this.loaded = this.service.loaded;
  }
  setLoadedinService(loaded: boolean) {
    this.service.loaded = loaded;

  }
}
