import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Categoria } from '../interface/categoria';
import { Produto } from '../interface/produto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  URL_BASE = 'http://lucasreno.kinghost.net/delivery';
  dados: Categoria[] = [];

  constructor(private http: HttpClient) {
    this.pegarDados();
  }

  pegarDados() {
    this.http.get<Categoria[]>(this.URL_BASE+'/categorias').subscribe(
      resposta => {
        this.dados = resposta;
        this.dados.forEach(dado => {
          this.http.get<Produto[]>(this.URL_BASE+'/produtos/'+dado.idCategoria).subscribe(
            resp => {
              dado.produtos = resp;
            }
          );
        });
      }
    );
  }
}
