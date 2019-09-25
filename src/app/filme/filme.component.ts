import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppService} from '../app.service';
import {Filme} from '../models/filme';
import {Personagem} from '../models/personagem';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.scss']
})
export class FilmeComponent implements OnInit, OnDestroy{

  /*VARIAVEIS DE EXIBICAO, LISTAGEM, E BUSCA*/
  filmeId: number;
  filmeObject: Filme;
  listPersonagens: Array<Personagem>;

  /*VARIAVEIS DE SUBSCRIPTIONS*/
  routeSubscription: Subscription;
  filmesSubscription: Subscription;
  personagensSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private service: AppService) {
    this.routeSubscription = this.activatedRoute.params.subscribe((params: any) => {
      this.filmeId = params['id'];
    });
  }

  ngOnInit() {
    this.getFilmeFromService(this.filmeId);
    this.getPersonagensListFromService();
  }

  /*METODO QUE BUSCA A LISTA DE FILMES DO SERVICO, E RETORNA O OBJETO QUE CONTEM DETERMINADO ID*/
  getFilmeFromService(id: number){
    this.filmesSubscription = this.service.getFilmesFromJsonArchive().subscribe((res: any) => {
      this.filmeObject = res.results.find(filme => filme.id == id);
    });
  }

  /*BUSCA A LISTA DE PERSONAGENS DO SERVICO*/
  getPersonagensListFromService(){
    this.personagensSubscription = this.service.getPersonagensFromJsonArchive().subscribe((res: any) => {
      this.listPersonagens = res.results;
    });
  }

  /*BUSCA O OBJETO DO PERSONAGEM PELO ID*/
  getPersonagemById(id: number){
     return this.listPersonagens.find(personagem => personagem.id == id);
  }

  /*UNSUBSCRIBES*/
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.filmesSubscription.unsubscribe();
    this.personagensSubscription.unsubscribe();
  }

}
