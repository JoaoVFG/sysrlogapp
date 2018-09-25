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
    
    this.userService.findByIdAsync(this.storage.retrieveIdUser())
      .subscribe(response => {
          this.user = response.body;
      })

    this.storage.saveUser(this.user);

    if (this.menu.length == 0) {

      this.user = this.storage.retrieveUser();

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
      });
    }

    return this.menu;
  }

  closeMenu(){
    console.log('fechou o menu');
    this.menu = [];
  }

}
