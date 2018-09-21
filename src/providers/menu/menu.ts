import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MenuProvider Provider');
  }

  getSideMenus() {
    return [
      {
        title: 'Profile', component: 'ProfilePage'
      },
      {
        title: 'Rota',
        subPages: [{
          title: 'Gerar nova Rota',
          component: 'RotaPage',
        }, 
        {
          title: 'Rotas Geradas',
          component: 'RotasPage',
        }]
      },
      {
        title: 'Pessoa', component: 'PessoaPage'
      },
      {
        title : 'Endereco',
        subPages: [{
          title: 'Meu Endereco',
          component: 'EnderecoPage',
        }] 
      },
      {
        title : 'Funcionario',
        subPages: [{
          title: 'Funcionario - Informacões',
          component: 'FuncionarioPage',
        }] 
      }
    ];
  }

}
