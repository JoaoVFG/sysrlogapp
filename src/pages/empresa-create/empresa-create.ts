import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { cep } from '../../models/cep.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InsertEnderecoDTO } from '../../models/inserts/insertEndereco.dto';
import { InsertLoginDTO } from '../../models/inserts/insertLogin.dto';
import { InsertPessoaJuridicaDTO } from '../../models/inserts/InsertPessoaJuridica.dto';
import { CepService } from '../../Service/Entity/cep.service';
import { PessoaService } from '../../Service/Entity/pessoa.service';
import { LoadingService } from '../../Service/Components/loading.service';
import { EmpresaService } from '../../Service/Entity/empresa.service';
import { Pessoa } from '../../models/pessoa.dto';
import { Empresa } from '../../models/empresa.dto';

/**
 * Generated class for the EmpresaCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empresa-create',
  templateUrl: 'empresa-create.html',
})
export class EmpresaCreatePage {

  formGroup: FormGroup;
  empresaMatrizBusca: Empresa;
  cep: cep = {
    cep: '',
    nomeRua: '',
    nomeBairro: '',
    nomeCidade: '',
    nomeEstado: ''
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public cepService: CepService,
    public pessoaService: PessoaService,
    public empresaService: EmpresaService,
    public alertController: AlertController,
    public loadingService: LoadingService) {


    this.formGroup = this.formBuilder.group({

      razaoSocial: [''],
      cnpj: [''],
      cep: ['', [Validators.required]],
      numeroLogradouro: ['', [Validators.required]],
      complemento: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],

      tipoEmpresa: [''],
      transportadora: [''],
      empresaMatriz: ['']

    })
  }

  signupUser() {
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
    this.insertPj(insertEndereco, insertLogin);



  }


  insertPj(insertEndereco: InsertEnderecoDTO, insertLogin: InsertLoginDTO) {
    let pessoa: InsertPessoaJuridicaDTO = {
      razaoSocial: this.formGroup.value.razaoSocial,
      cnpj: this.formGroup.value.cnpj,
      tipo: 2,
      insertEnderecoDTO: insertEndereco,
      insertLoginDTO: insertLogin
    }

    if (pessoa.cnpj == '' || pessoa.razaoSocial == '') {
      this.showErrorAlert();
    } else {
      this.pessoaService.insertPessoaJuridica(pessoa)
        .subscribe(() => {
          this.showInsertOk();
        })
    }
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

  buscaEmpresa() {
    let pessoa: Pessoa;
    this.pessoaService.findByCnpj(this.formGroup.value.empresaMatriz)
      .subscribe(response => {

        pessoa = response;

        this.empresaService.findByIdPessoa(pessoa.id)
          .subscribe(responseEmpresa => {
            this.empresaMatrizBusca = responseEmpresa;
            console.log(this.empresaMatrizBusca);
            
          }, errorEmpresa => {
            console.log(errorEmpresa)
          })

      }, error => {
        console.log(error)
      });

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
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  showErrorAlert() {
    let alert = this.alertController.create({
      title: 'Erro!',
      message: 'Existem Campos obrigatórios não preenchidos',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
        }
      ]
    });
    alert.present();
  }


}
