import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Personagem} from '../models/personagem';
import {Filme} from '../models/filme';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.scss']
})
export class PersonagensComponent implements OnInit, OnDestroy {

  listPersonagens: Array<Personagem>;
  listFilmes: Array<Filme>;
  searchString = {name: ''};

  personagensSubscription: Subscription;
  filmesSubscription: Subscription;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.getPersonagensListFromService();
    this.getFilmesListFromService();
  }

  getPersonagensListFromService(){
    this.personagensSubscription = this.service.getPersonagensFromJsonArchive().subscribe((res: any) => {
       this.listPersonagens = res.results.sort((a, b) => {
         if(b.films.length  < a.films.length){
           return -1;
         }

         if(b.films.length > a.films.length){
            return 1;
         }

         if(b.films.length == a.films.length){
           return a.name > b.name ? 1 : -1;
         }
       });
    });
  }

  getFilmesListFromService(){
    this.filmesSubscription = this.service.getFilmesFromJsonArchive().subscribe((res: any) => {
      this.listFilmes = res.results;
    });
  }

  ngOnDestroy(): void {
    this.personagensSubscription.unsubscribe();
    this.filmesSubscription.unsubscribe();
  }

  filterFilmeById(id): Filme{
    if(this.listFilmes){
      return this.listFilmes.find(filme => filme.id == id);
    }
  }

}
