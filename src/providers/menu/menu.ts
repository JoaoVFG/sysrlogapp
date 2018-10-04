import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { storageService } from '../../Service/storage.service';
import { User } from '../../models/user.dto';
import { UserService } from '../../Service/Entity/user.service';

@Injectable()
export class MenuProvider {

  menu = [];
  user : User
  constructor(public http: HttpClient,
              public storage : storageService,
              public userService : UserService) {
  }



  getSideMenus() {
    

    
    if (this.menu.length == 0) {
      this.user = this.storage.retrieveUser();
     
      if(! (this.user.roles.findIndex(u => u.id == '1')== -1)){
        console.log('tem');
        
      }
      
      //(e => e.cep === cepBusca
      this.menu.push({
        title: 'Profile', component: 'ProfilePage'
      });

      this.menu.push({
        title: 'Rota',
        subPages: [{
          title: 'Gerar nova Rota',
          component: 'RotaPage',
        },
        {
          title: 'Rotas Geradas',
          component: 'RotasPage',
        }]
      });

      this.menu.push({
        title: 'Pessoa', component: 'PessoaPage'
      });

      this.menu.push({
        title: 'Endereco',
        subPages: [{
          title: 'Meu Endereco',
          component: 'EnderecoPage',
        }]
      });

      this.menu.push({
        title: 'Empresa',
        subPages: [{
          title: 'Empresa - Informacões',
          component: 'EmpresaPage',
        }]
      });

      this.menu.push({
        title: 'Funcionario',
        subPages: [{
          title: 'Funcionario - Informacões',
          component: 'FuncionarioPage',
        }]
      },);

      this.menu.push({
        title : 'Cargos',
        component : 'CargoPage' 
      })

      this.menu.push({
        title : 'Ceps',
        component : 'CepsPage' 
      })

      this.menu.push({
        title : 'Usuários',
        component : 'UserPage' 
      })

      this.menu.push({
        title : 'Regiao',
        component : 'RegiaoPage'
      })
    }

    return this.menu;
  }

  closeMenu(){
    console.log('fechou o menu');
    this.menu = [];
  }

}
