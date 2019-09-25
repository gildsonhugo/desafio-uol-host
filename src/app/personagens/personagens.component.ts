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

  /*VARIAVEIS DE LISTAGEM E BUSCA*/
  listPersonagens: Array<Personagem>;
  listFilmes: Array<Filme>;
  searchString = {name: ''};

  /*VARIAVEIS DE SUBSCRIPTIONS*/
  personagensSubscription: Subscription;
  filmesSubscription: Subscription;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.getPersonagensListFromService();
    this.getFilmesListFromService();
  }

  /*BUSCA A LISTA DE PERSONAGENS DO SERVICO E ORDENA PELA QUANTIDADE DE FILMES, E PELO NOME, CASO TENHA A MESMA QUANTIDADE DE FILMES*/
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

  /*BUSCA A LISTA DE FILMES CHAMANDO O METODO DO SERVICO*/
  getFilmesListFromService(){
    this.filmesSubscription = this.service.getFilmesFromJsonArchive().subscribe((res: any) => {
      this.listFilmes = res.results;
    });
  }

  /*BUSCA O OBJETO DO FILME PELO O ID*/
  filterFilmeById(id): Filme{
    if(this.listFilmes){
      return this.listFilmes.find(filme => filme.id == id);
    }
  }

  /*UNSUBSCRIBES*/
  ngOnDestroy(): void {
    this.personagensSubscription.unsubscribe();
    this.filmesSubscription.unsubscribe();
  }

}
