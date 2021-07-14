import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  data: any;
  femaleCharactersNames = [
    'Enchantress',
    'Rogue',
    'Jubilee',
    'Psylocke',
    'Captain Marvel (Carol Danvers)',
    'Captain Marvel (Monica Rambeau)',
    'Captain Marvel (Phyla-Vell)',
    'She-Hulk',
    'Black Widow',
    'Mary Jane',
    'Scarlet Witch',
    'Jean Grey',
    'Mystique',
    'Storm',
    'Emma Frost',
    'Wasp',
    'Kitty Pryde',
    'Shadowcat',
    'Gamora',
    'Nebula',
    'Spider-Girl',
    'Spider-Woman',
    'Invisible Woman',
    'X-23',
    'Jessica Jones',
    'Maria Hill',
    'Okoye',
    'Carol Danvers',
    'Dazzler',
    'Magik',
    'Polaris',
    'Black Cat'
  ];
  femaleCharacters: ICharacters[] = [];
  attributionHTML: string = '';
  loaded = false;

  constructor(private httpClient: HttpClient) {}
  public getCharacters() {
    const url = `${environment.urlBase}characters?${this.getParameters()}`;
    return this.httpClient
      .get(encodeURI(url), { responseType: 'json', observe: 'response' })
      .pipe(
        map((data: any) => {
          this.data = data.body;
          return this.data;
        }),
        catchError((error) => {
          return throwError('Não foi possível recuperar os dados');
        })
      );
  }

  public getCharacterByName(name: String) {
    const url = `${
      environment.urlBase
    }characters?name=${name}&${this.getParameters()}`;
    return this.httpClient
      .get(encodeURI(url), { responseType: 'json', observe: 'response' })
      .pipe(
        map((data: any) => {
          this.data = data.body;
          return this.data;
        }),
        catchError((error) => {
          return throwError('Não foi possível recuperar os dados');
        })
      );
  }

  public getCharacterByNameStart(nameStart: String) {
    const url = `${
      environment.urlBase
    }characters?nameStartsWith=${nameStart}&${this.getParameters()}`;
    return this.httpClient
      .get(encodeURI(url), { responseType: 'json', observe: 'response' })
      .pipe(
        map((data: any) => {
          this.data = data.body;
          return this.data;
        }),
        catchError((error) => {
          return throwError('Não foi possível recuperar os dados');
        })
      );
  }

  public getComicByTitleStart(titleStart: String) {
    const url = `${
      environment.urlBase
    }comics?titleStartsWith=${titleStart}&${this.getParameters()}`;
    return this.httpClient
      .get(encodeURI(url), { responseType: 'json', observe: 'response' })
      .pipe(
        map((data: any) => {
          this.data = data.body;
          return this.data;
        }),
        catchError((error) => {
          return throwError('Não foi possível recuperar os dados');
        })
      );
  }
  private getParameters() {
    const ts = new Date().getTime().toString();
    ('');
    const md5 = new Md5();
    const hash = md5
      .appendStr(ts)
      .appendStr(environment.privateKey)
      .appendStr(environment.publicKey)
      .end();
    return 'apikey=' + environment.publicKey + '&ts=' + ts + '&hash=' + hash;
  }

  public requestDataFromMultipleSources(source?: any): Observable<any[]> {
    let response = [];
    if (!source) {
      for (let character of this.femaleCharactersNames) {
        response.push(this.getCharacterByNameStart(character));
      }
    } else {
      for (let character of source) {
        console.log(character)
        response.push(this.getCharacterByNameStart(character.name));
      }
    }
    return forkJoin(response);
  }
}
export interface ICharacters {
  comics: IData;
  description: string;
  events: IData;
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  series: IData;
  stories: IData;
  thumbnail: IThumbnail;
  urls: [];
}
export interface IThumbnail {
  path: string;
  extension: string;
}
export interface IData {
  available: number;
  collectionURI: string;
  items: [];
}
export interface ITotals {
  comics: number;
  events: number;
  series: number;
  stories: number;
}
