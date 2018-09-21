import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Endereco } from '../../models/endereco.dto';
import { cep } from '../../models/cep.dto';
import { Pessoa } from '../../models/pessoa.dto';
import { CepCompleto } from '../../models/cepCompleto.dto';
import { EnderecoService } from '../../Service/Entity/endereco.service';
import { UserService } from '../../Service/Entity/user.service';
import { storageService } from '../../Service/storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingService } from '../../Service/Components/loading.service';
import { CepService } from '../../Service/Entity/cep.service';
import { InsertEnderecoDTO } from '../../models/inserts/insertEndereco.dto';

/**
 * Generated class for the EnderecoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html',
})
export class EnderecoPage {

  pessoa : Pessoa;
  endereco : Endereco;

  modo: string = 'Consulta';

  formGroup: FormGroup;
  
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
    public enderecoService : EnderecoService,
    public userService : UserService,
    public storage: storageService,
    public formBuilder: FormBuilder,
    public loadingService: LoadingService,
    public cepService : CepService,
    public alertController: AlertController) {

      this.formGroup = this.formBuilder.group({
        cep: [''],
        numeroLogradouro: [''],
        complemento: [''],
      })
  }

  ionViewDidLoad() {
    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(response =>{
        this.pessoa = response.pessoa;
        this.enderecoService.findByPessoa(response.pessoa.id)
          .subscribe(responseEndereco =>{
            this.endereco = responseEndereco;
          })

      })
  }

  alteraEndereco(){
    console.log(this.formGroup);
    let updateEndereco : InsertEnderecoDTO = {
      idPessoa : this.pessoa.id,
      cep : this.formGroup.value.cep,
      numeroLogradouro : this.formGroup.value.numeroLogradouro,
      complemento : this.formGroup.value.complemento, 
    } 

    this.enderecoService.updateEndereco(this.endereco.id,updateEndereco)
      .subscribe(response => {
        this.showUpdateOk();
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

  showUpdateOk() {
    let alert = this.alertController.create({
      title: 'Sucesso!',
      message: 'Cadastro Alterado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.setRoot('EnderecoPage');
            this.alteraModo('Consulta');
          }
        }
      ]
    });
    alert.present();
  }

  alteraModo(newModo: string) {
    this.modo = newModo;
  }

}
