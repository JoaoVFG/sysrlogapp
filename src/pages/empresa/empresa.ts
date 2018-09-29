import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmpresaService } from '../../Service/Entity/empresa.service';
import { FuncionarioService } from '../../Service/Entity/funcionario.service';
import { Empresa } from '../../models/empresa.dto';
import { storageService } from '../../Service/storage.service';
import { UserService } from '../../Service/Entity/user.service';
import { Funcionario } from '../../models/funcionario.dto';
import { Endereco } from '../../models/endereco.dto';
import { EnderecoService } from '../../Service/Entity/endereco.service';
import { Pessoa } from '../../models/pessoa.dto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PessoaService } from '../../Service/Entity/pessoa.service';
import { InsertEmpresa } from '../../models/inserts/insertEmpresa.dto';


@IonicPage()
@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html',
})
export class EmpresaPage {

  formGroup: FormGroup;
  modo: string = 'consulta';
  empresa: Empresa;
  endereco: Endereco;
  pessoa: Pessoa;


  empresaMatrizBusca: Empresa = {
    id: '',
    empresaMatriz: '',
    pessoa: {
      cnpj: '',
      cpf: '',
      dataNascimento: '',
      id: '',
      nome: '',
      razaoSocial: '',
      sexo: '',
      tipo: undefined
    },
    tipoEmpresa: undefined,
    transportadora: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaService: EmpresaService,
    public userService: UserService,
    public funcionarioService: FuncionarioService,
    public storage: storageService,
    public enderecoService: EnderecoService,
    public formBuilder: FormBuilder,
    public pessoaService: PessoaService,
    public alertController: AlertController,) {

   this.formGroup = formBuilder.group({
    tipoEmpresa: ['1'],
    transportadora: ['1'],
    empresaMatriz: ['']
   })

  }

  ionViewDidLoad() {
    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(response => {

        if (response.pessoa.tipo.id == '1') {
          this.funcionarioService.findByPessoa(response.pessoa.id)
            .subscribe(responseFuncionario => {

              this.empresa = responseFuncionario.empresa;
              this.carregaEndereco(this.empresa.pessoa.id);
            }, error => {
              //this.navCtrl.setRoot('ProfilePage');
              console.log(error);

            })

        } else {
          this.empresaService.findByIdPessoa(response.pessoa.id)
            .subscribe(responseEmpresas => {

              this.empresa = responseEmpresas;
              this.carregaEndereco(this.empresa.pessoa.id);
            }, error => {
              console.log(error);
              // this.navCtrl.setRoot('ProfilePage');
            })
        }

      })
  }

  carregaEndereco(idPessoa: string) {

    this.enderecoService.findByPessoa(idPessoa)
      .subscribe(responseEndereco => {
        this.endereco = responseEndereco;
      }, error => {
        console.log(error);

      })

  }

  exibeFiliais() {

    this.navCtrl.push('EmpresaFiliaisPage', { 'empresa': this.empresa })

  }

  exibeFuncionarios(){
    this.navCtrl.push('EmpresaFuncionarioPage', { 'idEmpresa': this.empresa.id })
  }

  updateEmpresa() {
    
    

    let idEmpresaMatriz = '';
    if(this.empresaMatrizBusca.id != '') idEmpresaMatriz = this.empresaMatrizBusca.pessoa.id;
    

    let updateEmpresa : InsertEmpresa = {
      pessoa : this.empresa.pessoa.id,
      tipoEmpresa : this.formGroup.value.tipoEmpresa,
      transportadora : this.formGroup.value.transportadora,
      empresaMatriz : this.formGroup.value.empresaMatriz
    }


    this.empresaService.updateEmpresa(this.empresa.id,updateEmpresa)
      .subscribe(response => {
        this.showUpdateOk();
      }, error => {
        console.log(error);
        
      })
    
    
  }

  createEmpresa() {
    this.navCtrl.setRoot('EmpresaCreatePage');

  }

  verificaPermissaoUpdate(): boolean {
    let user = this.storage.retrieveUser();
    if (!(user.roles.findIndex(u => u.id == '11') == -1)) {
      return true;
    } else {
      return false;
    }
  }

  verificaPermissaoCreate(): boolean {
    let user = this.storage.retrieveUser();
    if (!(user.roles.findIndex(u => u.id == '9') == -1)) {
      return true;
    } else {
      return false;
    }
  }

  alteraModo(novoModo: string) {
    if(novoModo == 'altera'){
      if(! (typeof this.empresa.empresaMatriz == "undefined")) {
        console.log('teste');
        
        this.empresaService.findById(this.empresa.empresaMatriz)
          .subscribe(response => {
            this.empresaMatrizBusca = response;
          },error =>{
            console.log(error);
            
          })
      }
    }

    this.modo = novoModo;
  }

  buscaEmpresa() {
    let pessoa: Pessoa;
    this.pessoaService.findByCnpj(this.formGroup.value.empresaMatriz)
      .subscribe(response => {

        pessoa = response;
        this.empresaService.findByIdPessoa(pessoa.id)
          .subscribe(responseEmpresa => {

            console.log(this.formGroup);
            console.log();

            this.empresaMatrizBusca = responseEmpresa;

          }, errorEmpresa => {
            console.log(errorEmpresa)
          })

      }, error => {
        console.log(error)
      });

  }

  openEmpresaDetail(empresaDetail: Empresa) {
    this.navCtrl.push('EmpresaDetailPage', { 'empresa': empresaDetail })
  }

  showUpdateOk() {
    let alert = this.alertController.create({
      title: 'Sucesso!',
      message: 'Cadastro Alterado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.alteraModo('consulta');
          }
        }
      ]
    });
    alert.present();
  }
}
