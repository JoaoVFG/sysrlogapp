import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PessoaService } from '../../Service/Entity/pessoa.service';
import { Pessoa } from '../../models/pessoa.dto';
import { LoadingService } from '../../Service/Components/loading.service';
import { User } from '../../models/user.dto';
import { UserService } from '../../Service/Entity/user.service';
import { storageService } from '../../Service/storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-pessoa',
  templateUrl: 'pessoa.html',
})
export class PessoaPage {

  pessoa: Pessoa;
  user: User = {
    id: '',
    email: '',
    roles: [],
    senha: '',
    pessoa: undefined,
  }
  modo: string = 'Consulta';
  formGroup: FormGroup;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pessoaService: PessoaService,
    public loadingService: LoadingService,
    public userService: UserService,
    public storage: storageService,
    public alertController: AlertController,
    public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      id: [''],
      nome: [''],
      razaoSocial: [''],
      cpf: [''],
      cnpj: [''],
      dataNascimento: ['',],
      sexo: [''],
    });
  }

  ionViewDidLoad() {
    let loading = this.loadingService.presentLoading();

    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(responseUser => {
        this.pessoa = responseUser.pessoa;
        console.log(this.pessoa);
        
      },
        error => {
          console.log(error);

        })

    loading.dismiss();
  }

  alteraPessoa() {
    let updatePessoa: Pessoa = {
      id: this.pessoa.id,
      nome: this.formGroup.value.nome,
      cpf: this.formGroup.value.cpf,
      dataNascimento: this.formGroup.value.dataNascimento,
      sexo: this.formGroup.value.sexo,
      razaoSocial: this.formGroup.value.razaoSocial,
      cnpj: this.formGroup.value.cnpj,
      tipo: undefined
    }
    console.log(updatePessoa)
    this.pessoaService.updatePessoa(updatePessoa)
      .subscribe((response) =>{
        console.log(response);
        
      },error =>{
        console.log(error);
        
      });
    this.showUpdateOk();



  }

  alteraModo(newModo: string) {
    this.modo = newModo;
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
            this.navCtrl.setRoot('PessoaPage');
            this.alteraModo('Consulta');
          }
        }
      ]
    });
    alert.present();
  }
}
