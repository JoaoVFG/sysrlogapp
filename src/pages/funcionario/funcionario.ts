import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../Service/Entity/user.service';
import { FuncionarioService } from '../../Service/Entity/funcionario.service';
import { EmpresaService } from '../../Service/Entity/empresa.service';
import { storageService } from '../../Service/storage.service';
import { Funcionario } from '../../models/funcionario.dto';
import { Empresa } from '../../models/empresa.dto';

/**
 * Generated class for the FuncionarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-funcionario',
  templateUrl: 'funcionario.html',
})
export class FuncionarioPage {

  funcionario : Funcionario;
  empresa : Empresa;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public funcionarioService: FuncionarioService,
    public empresaService : EmpresaService,
    public storage : storageService) {
  }

  ionViewDidLoad() {
    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(responseUser =>{

        this.funcionarioService.findByPessoa(responseUser.pessoa.id)
          .subscribe(responseFuncinario =>{
            this.funcionario = responseFuncinario
            console.log(responseFuncinario)
          })
      },
      error =>{
        console.log('não é funcionario');
        
      }
    )
      
  }

}
