import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmpresaService } from '../../Service/Entity/empresa.service';
import { FuncionarioService } from '../../Service/Entity/funcionario.service';
import { Empresa } from '../../models/empresa.dto';
import { storageService } from '../../Service/storage.service';
import { UserService } from '../../Service/Entity/user.service';
import { Funcionario } from '../../models/funcionario.dto';
import { Endereco } from '../../models/endereco.dto';
import { EnderecoService } from '../../Service/Entity/endereco.service';
import { Pessoa } from '../../models/pessoa.dto';

/**
 * Generated class for the EmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html',
})
export class EmpresaPage {

  empresa: Empresa;
  endereco: Endereco;
  pessoa: Pessoa;
  filiais: Empresa[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaService: EmpresaService,
    public userService: UserService,
    public funcionarioService: FuncionarioService,
    public storage: storageService,
    public enderecoService: EnderecoService) {
  }

  ionViewDidLoad() {
    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(response => {

        if (response.pessoa.tipo.id == '1') {
          this.funcionarioService.findByPessoa(response.pessoa.id)
            .subscribe(responseFuncionario => {
              this.empresa = responseFuncionario.empresa;
              console.log(this.empresa);
              

            },error =>{
              console.log(error);
              
            })

        } else {
          this.empresaService.findByIdPessoa(response.pessoa.id)
            .subscribe(responseEmpresas => {
              this.empresa = responseEmpresas;

            },error =>{
              console.log(error);
              
            })
        }

        this.enderecoService.findByPessoa(this.storage.retrieveIdUser())
          .subscribe(responseEndereco => {
            this.endereco = responseEndereco;
          },error =>{
            console.log(error);
            
          })

      })
  }

  exibeFiliais() {
   
    
    let idMatriz: string;
    if (this.empresa.empresaMatriz) {
      idMatriz = this.empresa.empresaMatriz;
    } else {
      idMatriz = this.empresa.pessoa.id
    }

    this.empresaService.findByMatriz(idMatriz)
      .subscribe(responseEmpresas => {
        this.filiais = responseEmpresas;
      },
        error => {
          console.log(error)
        })
  }

  updateEmpresa(){
    
  }

  createEmpresa(){
    this.navCtrl.setRoot('EmpresaCreatePage');
    
  }
  esconder(){
    this.filiais = undefined;
  }

  verificaPermissaoUpdate():boolean{
    let user = this.storage.retrieveUser();
    if(! (user.roles.findIndex(u => u.id == '11')== -1)){
      return true;
    }else{
      return false;
    }
  }

  verificaPermissaoCreate():boolean{
    let user = this.storage.retrieveUser();
    if(! (user.roles.findIndex(u => u.id == '9')== -1)){
      return true;
    }else{
      return false;
    }
  }

  openEmpresaDetail(empresaDetail : Empresa){
    this.navCtrl.push('EmpresaDetailPage', {'empresa': empresaDetail})
    
  }
}
