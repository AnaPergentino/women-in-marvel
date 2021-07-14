import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ICharacters, ITotals, MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.css']
})
export class ComparisionComponent implements OnInit {

  xMenWomen = [
    {name:"Dazzler",  comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Psylocke",  comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Magik", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Jubilee", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Mystique", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Rogue", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Emma Frost", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Shadowcat", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Jean Grey", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Storm", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Polaris", comics: 0, events: 0, series: 0, stories: 0 }
  ];
  xMenMen = [
    {name: "Wolverine",  comics: 0, events: 0, series: 0, stories: 0 },
    {name: "Logan",  comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Magneto",  comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Professor X",  comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Cyclops",  comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Sabretooth", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Iceman", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Angel", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Beast", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Sunfire", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Vulcan", comics: 0, events: 0, series: 0, stories: 0 },

  ];
  xMenWomenTotals: ITotals = { comics: 0, events: 0, series: 0, stories: 0 };
  xMenMenTotals: ITotals = { comics: 0, events: 0, series: 0, stories: 0 };
  xMenMenCharacters: ICharacters[] = [];
  dataSourceXmenWomen = this.xMenWomen;
  dataSourceXmenMen = this.xMenMen;
  spiderManWomen = [
    {name:"Mary Jane",  comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Spider-Girl", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Spider-Woman", comics: 0, events: 0, series: 0, stories: 0 },
    {name:"Black Cat", comics: 0, events: 0, series: 0, stories: 0 },

  ];
  spiderManMen = [
    {name: "Spider-Man",  comics: 0, events: 0, series: 0, stories: 0 },
    {name: "Venom",  comics: 0, events: 0, series: 0, stories: 0 },
    {name: "Doctor Octopus",  comics: 0, events: 0, series: 0, stories: 0 },
    {name: "Green Goblin",  comics: 0, events: 0, series: 0, stories: 0 },

  ];
  spiderManWomenTotals: ITotals = { comics: 0, events: 0, series: 0, stories: 0 };
  spiderManMenTotals: ITotals = { comics: 0, events: 0, series: 0, stories: 0 };
  spiderManMenCharacters: ICharacters[] = [];
  dataSourceSpiderManWomen = this.spiderManWomen;
  dataSourceSpiderManMen = this.spiderManMen;
  //femaleCharacters: ICharacters[] = [];
ready =false;
displayedColumns = ['name', 'comics', 'events', 'series', 'stories'];

  constructor(private service: MarvelService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    //this.localStorage.clear()
    this.getXmenWomen()
    this.getXmenMen()
    this.getSpiderManWomen()
    this.getSpiderManMen()
    this.calculateSum(this.xMenWomenTotals, this.xMenWomen)
    this.calculateSum(this.xMenMenTotals, this.xMenMen)
    this.calculateSum(this.spiderManWomenTotals, this.spiderManWomen)
    this.calculateSum(this.spiderManMenTotals, this.spiderManMen)
  }
  getXmenWomen() {
    this.service.femaleCharacters.filter(character => {
      let name = character.name.replace(/[ \(].*/g, '');
      this.xMenWomen.filter(xMenCharacter => {
        this.calculateSubtypeSum(xMenCharacter, name, character)
      })

    });
    this.setDataSource(this.dataSourceXmenWomen, this.xMenWomen);

  }

  getXmenMen() {
    if (Object.keys(this.localStorage.get('xMenMaleCharacters')).length != 0) {
      this.xMenMenCharacters = this.localStorage.get('xMenMaleCharacters')
      this.calculateSubtypeAndPushToArray(this.xMenMenCharacters, this.xMenMen);
      this.setDataSource(this.dataSourceXmenMen, this.xMenMen);
      this.ready=true;
    }
    else {
      this.service.requestDataFromMultipleSources(this.xMenMen).toPromise().then(
        (response) => {
          for (let resp of response) {
            for (let character of resp['data']['results']) {
              this.xMenMenCharacters.push(character);
            }
          }
          this.localStorage.set('xMenMaleCharacters', this.xMenMenCharacters)
          this.calculateSubtypeAndPushToArray(this.xMenMenCharacters, this.xMenMen);
        }
      )
    }

  }

getSpiderManWomen() {
  this.service.femaleCharacters.filter(character => {
    let name = character.name.replace(/[ \(].*/g, '');
    this.spiderManWomen.filter(spiderManCharacter => {
      this.calculateSubtypeSum(spiderManCharacter, name, character)
    })

  });
  this.setDataSource(this.dataSourceSpiderManWomen, this.spiderManWomen);

}

getSpiderManMen() {
  if (Object.keys(this.localStorage.get('spiderManMaleCharacters')).length != 0) {
    this.spiderManMenCharacters = this.localStorage.get('spiderManMaleCharacters')
    this.calculateSubtypeAndPushToArray(this.spiderManMenCharacters, this.spiderManMen);

    this.setDataSource(this.dataSourceSpiderManMen, this.spiderManMen);
    this.ready=true;
  }
  else {
    this.service.requestDataFromMultipleSources(this.spiderManMen).toPromise().then(
      (response) => {
        for (let resp of response) {
          for (let character of resp['data']['results']) {
            this.spiderManMenCharacters.push(character);
          }
        }
        this.localStorage.set('spiderManMaleCharacters', this.spiderManMenCharacters)
        this.calculateSubtypeAndPushToArray(this.spiderManMenCharacters, this.spiderManMen);
      }
    )
  }

}
calculateSubtypeAndPushToArray(charactersFromSource: any[], charactersVector: any[]){
  charactersFromSource.filter(characterComplete => {
  let name = characterComplete.name.replace(/[ \(].*/g, '');
  charactersVector.filter(characterJustVector => {
    this.calculateSubtypeSum(characterJustVector, name, characterComplete)
  })

});
this.setDataSource(this.dataSourceSpiderManMen, this.xMenMen);
this.ready=true;
}
calculateSubtypeSum(characterFromVector: { name: string | any[]; comics: any; events: any; series: any; stories: any; }, name: any, character: any){
  if(characterFromVector.name.includes(name)){
    characterFromVector.comics+=character.comics.available;
    characterFromVector.events+=character.events.available;
    characterFromVector.series+=character.series.available;
    characterFromVector.stories+=character.stories.available;
  }
}
calculateSum(totals: ITotals, source: any) {
  if (source) {
    for (let character of source) {
      this.incrementTotal(totals, character);
    }
  }
}
  incrementTotal(totals: ITotals, character: any) {
    totals.comics += character.comics;
    totals.events += character.events;
    totals.series += character.series;
    totals.stories += character.stories;
  }
  setDataSource(dataSource: { name: string; comics: number; events: number; series: number; stories: number; }[], source: { name: string; comics: number; events: number; series: number; stories: number; }[]){
    dataSource = source;

  }

}
