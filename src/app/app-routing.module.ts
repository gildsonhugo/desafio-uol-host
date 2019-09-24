import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonagensComponent} from './personagens/personagens.component';
import {FilmeComponent} from './filme/filme.component';

const routes: Routes = [
  { path: 'personagens', component: PersonagensComponent },
  { path: 'filme/:id', component: FilmeComponent },
  { path: '**', redirectTo: 'personagens', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
