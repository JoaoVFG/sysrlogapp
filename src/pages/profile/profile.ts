import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaService } from '../../Service/Entity/pessoa.service';
import { storageService } from '../../Service/storage.service';
import { Pessoa } from '../../models/pessoa.dto';
import { LoadingService } from '../../Service/Components/loading.service';
import { EnderecoService } from '../../Service/Entity/endereco.service';
import { Endereco } from '../../models/endereco.dto';
import { UserService } from '../../Service/Entity/user.service';
import { User } from '../../models/user.dto';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  pessoa: Pessoa;
  user: User = {
    id: '',
    email: '',
    roles: [],
    senha: '',
    pessoa: undefined,
    apiKey: ''
  }
  email: string;
  endereco: Endereco;
  apiKey = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pessoaService: PessoaService,
    public enderecoService: EnderecoService,
    public userService: UserService,
    public storage: storageService,
    public loadingService: LoadingService) {

    this.email = this.storage.retriveEmail();
  }

  ionViewDidLoad() {
    let loading = this.loadingService.presentLoading();

    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(responseUser => {
        this.apiKey = responseUser.apiKey;
        this.pessoa = responseUser.pessoa;
        this.enderecoService.findByPessoa(this.pessoa.id)
          .subscribe(responseEnd => {
            this.endereco = responseEnd;
          },
            error => {
              console.log(error);

            })
      },
        error => {
          console.log(error);

        })

    loading.dismiss();
  }

}
