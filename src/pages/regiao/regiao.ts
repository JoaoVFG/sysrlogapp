import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegiaoService } from '../../Service/Entity/regiao.service';
import { EmpresaService } from '../../Service/Entity/empresa.service';
import { UserService } from '../../Service/Entity/user.service';
import { FuncionarioService } from '../../Service/Entity/funcionario.service';
import { storageService } from '../../Service/storage.service';
import { Regiao } from '../../models/regiao.dto';
import { Empresa } from '../../models/empresa.dto';

/**
 * Generated class for the RegiaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regiao',
  templateUrl: 'regiao.html',
})
export class RegiaoPage {

  regiao: Regiao;
  exibeCeps: string = 'naoExibir';
  empresa : Empresa;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public regiaoService: RegiaoService,
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

              this.regiaoService.findByEmpresa(responseFuncionario.empresa.id)
                .subscribe(response => {
                  this.regiao = response;
                }, error => {
                  console.log(error);
                })

            }, error => {
              
              console.log(error);

            })

        } else {
          this.empresaService.findByIdPessoa(response.pessoa.id)
            .subscribe(responseEmpresas => {
              this.empresa = responseEmpresas;
              this.regiaoService.findByEmpresa(responseEmpresas.id)
                .subscribe(response => {
                  this.regiao = response;
                 
                }, error => {
                  console.log(error);
                })

            }, error => {
              console.log(error);
              
            })
        }

      }, error =>{
        console.log(error);
        
      })
  }

  cadastroRegiao() {
    this.navCtrl.push('RegiaoCreatePage',{'empresa' : this.empresa});
  }

  alteraRegiao() {
    this.navCtrl.push('RegiaoUpdatePage',{'regiao' : this.regiao});
  }

  verificaPermissaoAlteraRegiao(): boolean {
    let user = this.storage.retrieveUser();
    if (!(user.roles.findIndex(u => u.id == '30') == -1)) {
      return true;
    } else {
      return false;
    }
  }

  verificaPermissaoCriaRegiao(): boolean {
    let user = this.storage.retrieveUser();
    if (!(user.roles.findIndex(u => u.id == '28') == -1)) {
      return true;
    } else {
      return false;
    }
  }

  exibirCeps(newModo: string) {
    this.exibeCeps = newModo;
  }

}
