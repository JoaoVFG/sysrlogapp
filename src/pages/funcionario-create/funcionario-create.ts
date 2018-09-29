import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { LoadingService } from '../../Service/Components/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from '../../Service/Entity/cep.service';
import { PessoaService } from '../../Service/Entity/pessoa.service';
import { EmpresaService } from '../../Service/Entity/empresa.service';
import { cep } from '../../models/cep.dto';
import { Cargo } from '../../models/cargo.dto';
import { CargoService } from '../../Service/Entity/cargo.service';
import { InsertEnderecoDTO } from '../../models/inserts/insertEndereco.dto';
import { InsertLoginDTO } from '../../models/inserts/insertLogin.dto';
import { InsertPessoaFisicaDTO } from '../../models/inserts/InsertPessoaFisica.dto';
import { Pessoa } from '../../models/pessoa.dto';
import { InsertFuncionario } from '../../models/inserts/insertFuncionario.dto';
import { FuncionarioService } from '../../Service/Entity/funcionario.service';

/**
 * Generated class for the FuncionarioCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-funcionario-create',
  templateUrl: 'funcionario-create.html',
})
export class FuncionarioCreatePage {

  formGroup: FormGroup;
  idEmpresa : string;
  cargos : Cargo[];
  cep: cep = {
    cep: '',
    nomeRua: '',
    nomeBairro: '',
    nomeCidade: '',
    nomeEstado: ''
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public cepService: CepService,
    public pessoaService: PessoaService,
    public empresaService: EmpresaService,
    public cargoService : CargoService,
    public funcionarioService : FuncionarioService,
    public alertController: AlertController,
    public loadingService: LoadingService) {

      this.idEmpresa = this.navParams.get('idEmpresa');
      this.formGroup = this.formBuilder.group({

        nome: ['fun teste insercao',[Validators.required]],
        cpf: ['12233445556',[Validators.required]],
        dataNascimento: ['01/08/2000',[Validators.required]],
        sexo: ['M'],

        idCargo:[''],

        cep: ['12285020', [Validators.required]],
        numeroLogradouro: ['100', [Validators.required]],
        complemento: ['APT 10 Bloco D'],

        email: ['funtesteinsert@ft.com', [Validators.required,Validators.email]],
        senha: ['123', [Validators.required]],
  
        
      })

  }

  ionViewDidLoad() {
    this.buscaCargos();
  }

  insertFuncionario(){
    let loading = this.loadingService.presentLoading();
    let insertEndereco: InsertEnderecoDTO = {
      idPessoa: null,
      cep: this.formGroup.value.cep,
      numeroLogradouro: this.formGroup.value.numeroLogradouro,
      complemento: this.formGroup.value.complemento
    };
    let insertLogin: InsertLoginDTO = {
      idPessoa: null,
      email: this.formGroup.value.email,
      senha: this.formGroup.value.senha,
    };

    let pessoa: InsertPessoaFisicaDTO = {
      nome: this.formGroup.value.nome,
      cpf: this.formGroup.value.cpf,
      dataNascimento: this.formGroup.value.dataNascimento,
      sexo: this.formGroup.value.sexo,
      tipo: 1,
      insertEnderecoDTO: insertEndereco,
      insertLoginDTO: insertLogin
    }

    this.pessoaService.insertPessoaFisica(pessoa)
      .subscribe(response => {
        let pessoaCriada : Pessoa = JSON.parse(response.body);

        let insertFuncionario : InsertFuncionario = {
            idPessoa : pessoaCriada.id,
            idCargo : this.formGroup.value.idCargo,
            idEmpresa : this.idEmpresa
        }

        this.funcionarioService.insertFuncionario(insertFuncionario)
          .subscribe(response => {
            this.showInsertOk();
            console.log(response);
            loading.dismiss();
          }, error => {
            loading.dismiss();
          })

      },error => {
        loading.dismiss();
      }) 
  }

  buscaCargos(){
    this.cargoService.findAll()
      .subscribe(response => {
        this.cargos = response;
      },error =>{
        console.log(error);
        
      })
  }

  

  verificaCep() {
    let loading = this.loadingService.presentLoading();
    this.cepService.findByCep(this.formGroup.value.cep)
      .subscribe((response) => {
        this.cep = response;
        loading.dismiss();
      },
        (error) => {
          loading.dismiss();
        })

  }

  showInsertOk() {
    let alert = this.alertController.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.push('EmpresaPage');
          }
        }
      ]
    });
    alert.present();
  }
}
