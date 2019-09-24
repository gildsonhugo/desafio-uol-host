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

  filmeId: number;
  filmeObject: Filme;
  listPersonagens: Array<Personagem>;

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

  getFilmeFromService(id: number){
    this.filmesSubscription = this.service.getFilmesFromJsonArchive().subscribe((res: any) => {
      this.filmeObject = res.results.find(filme => filme.id == id);
    });
  }

  getPersonagensListFromService(){
    this.personagensSubscription = this.service.getPersonagensFromJsonArchive().subscribe((res: any) => {
      this.listPersonagens = res.results;
    });
  }

  getPersonagemById(id: number){
     return this.listPersonagens.find(personagem => personagem.id == id);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.filmesSubscription.unsubscribe();
    this.personagensSubscription.unsubscribe();
  }

}
