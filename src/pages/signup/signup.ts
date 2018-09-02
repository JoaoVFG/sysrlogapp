import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from '../../Service/Entity/cep.service';
import { cep } from '../../models/cep.dto';
import { InsertEnderecoDTO } from '../../models/inserts/insertEndereco.dto';
import { InsertLoginDTO } from '../../models/inserts/insertLogin.dto';
import { PessoaService } from '../../Service/Entity/pessoa.service';
import { InsertPessoaFisicaDTO } from '../../models/inserts/InsertPessoaFisica.dto';
import { InsertPessoaJuridicaDTO } from '../../models/inserts/InsertPessoaJuridica.dto';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup;
  tipoPessoa : any = '1';
  
  cep : cep = {
    cep : '',
	  nomeRua : '',
	  nomeBairro : '',
	  nomeCidade : '',
	  nomeEstado : ''
}

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menu: MenuController,
              public formBuilder: FormBuilder,
              public cepService: CepService,
              public pessoaService : PessoaService,
              public alertController : AlertController) {

    this.formGroup = this.formBuilder.group({
      tipo : ["1"],
      nome : [''],
      razaoSocial: [''],
      cpf : [''],
      cnpj : [''],
      dataNascimento : [''],
      sexo : [''],
      cep : [''],
      numeroLogradouro : ['',],
      complemento : [''],
      email : [''],
      senha:  [''],

      
    })
  }

  signupUser(){
    let insertEndereco: InsertEnderecoDTO = {
      idPessoa : null,
      cep : this.formGroup.value.cep,
      numeroLogradouro : this.formGroup.value.numeroLogradouro,
      complemento : this.formGroup.value.complemento
    };
    let insertLogin:InsertLoginDTO = {
      idPessoa : null,
      email : this.formGroup.value.email,
      senha : this.formGroup.value.senha,
    };
    
    if(this.tipoPessoa == 1){

      let pessoa : InsertPessoaFisicaDTO = {
        nome : this.formGroup.value.nome,
        cpf : this.formGroup.value.cpf,
        dataNascimento : this.formGroup.value.dataNascimento,
        sexo : this.formGroup.value.sexo,
        tipo : this.tipoPessoa,
        insertEnderecoDTO : insertEndereco,
        insertLoginDTO : insertLogin
      }    

      this.pessoaService.insertPessoaFisica(pessoa)
        .subscribe(()=>{
          this.showInsertOk();
        })

    }else{

      let pessoa : InsertPessoaJuridicaDTO = {
        razaoSocial : this.formGroup.value.razaoSocial,
        cnpj : this.formGroup.value.cnpj,
        tipo : this.tipoPessoa,
        insertEnderecoDTO : insertEndereco,
        insertLoginDTO : insertLogin
      }
      
      this.pessoaService.insertPessoaJuridica(pessoa)
        .subscribe(() => {
          this.showInsertOk();
        })
    }

    
  }

  verificaCep(){
    this.cepService.findByCep(this.formGroup.value.cep)
      .subscribe((response) =>{
        this.cep = response;
        console.log(this.cep);
        
      },
      (error) =>{
        console.log(error);
        
      }
    )
  }
  
  showInsertOk(){
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

  putTipo(tipo:string){
    this.tipoPessoa = tipo;
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);

  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  

}
