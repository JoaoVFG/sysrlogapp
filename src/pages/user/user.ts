import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmpresaService } from '../../Service/Entity/empresa.service';
import { UserService } from '../../Service/Entity/user.service';
import { FuncionarioService } from '../../Service/Entity/funcionario.service';
import { storageService } from '../../Service/storage.service';
import { Empresa } from '../../models/empresa.dto';
import { Pessoa } from '../../models/pessoa.dto';
import { User } from '../../models/user.dto';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  empresa: Empresa;
  pessoa: Pessoa;
  users : User[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public empresaService: EmpresaService,
    public userService: UserService,
    public funcionarioService: FuncionarioService,
    public storage: storageService) {
  }

  ionViewDidLoad() {
    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(response => {

        if (response.pessoa.tipo.id == '1') {
          this.funcionarioService.findByPessoa(response.pessoa.id)
            .subscribe(responseFuncionario => {

              this.empresa = responseFuncionario.empresa;
              this.buscaUsuarios(this.empresa.id);
            }, error => {
              //this.navCtrl.setRoot('ProfilePage');
              console.log(error);

            })

        } else {
          this.empresaService.findByIdPessoa(response.pessoa.id)
            .subscribe(responseEmpresas => {
              this.empresa = responseEmpresas;
              this.buscaUsuarios(this.empresa.id);
            }, error => {
              console.log(error);
              // this.navCtrl.setRoot('ProfilePage');
            })
        }

      })
  }

  buscaUsuarios(idEmpresa : string){
    this.userService.findByEmpresa(idEmpresa)
      .subscribe(response =>{
        this.users = response;
        console.log(this.users);
        
      }, error => {
        console.log(error);
        
      })
  }

  openUserDetail(userDetail : User){
    this.navCtrl.push('UserDetailPage',{'userDetail': userDetail })
  }

}
