import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ICharacters, ITotals, MarvelService } from '../services/marvel.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CharactersListComponent implements OnInit {
  constructor(private service: MarvelService) { }
  characters: ICharacters[] = [];
  columnsToDisplay = ['Name', 'Comics', 'Events', 'Series', 'Stories'];
  expandedElement: ICharacters | null | undefined;
  CHARACTER_DATA: ICharacters[] = [];
  totals: ITotals = { comics: 0, events: 0, series: 0, stories: 0 }
  dataSource = [...this.CHARACTER_DATA];
  loaded = false;

  ngOnInit(): void {
    this.getFemaleCharacters();
    this.calculateSum()
    console.log(this.totals)
    this.setLoaded();
  }

  getFemaleCharacters() {
    this.characters = this.service.femaleCharacters;
    this.dataSource = this.characters;
  }

  setLoaded() {
    this.loaded = this.service.loaded;
  }
  containsThumbnail(path: string) {
    return !path.includes('image_not_available');
  }
  calculateSum() {
    if (this.dataSource)
      for (let character of this.dataSource) {
        this.incrementTotal(character);
      }
    }

  incrementTotal(character: ICharacters) {
    this.totals.comics += character.comics.available;
    this.totals.events += character.events.available;
    this.totals.series += character.series.available;
    this.totals.stories += character.stories.available;
  }
}
