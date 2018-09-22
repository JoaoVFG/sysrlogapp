import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
        title : 'Empresa',
        subPages: [{
          title: 'Empresa - Informacões',
          component: 'EmpresaPage',
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
