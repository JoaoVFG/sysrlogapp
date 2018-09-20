import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaService } from '../../Service/Entity/pessoa.service';
import { Pessoa } from '../../models/pessoa.dto';
import { LoadingService } from '../../Service/Components/loading.service';
import { User } from '../../models/user.dto';
import { UserService } from '../../Service/Entity/user.service';
import { storageService } from '../../Service/storage.service';

/**
 * Generated class for the PessoaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public pessoaService : PessoaService,
              public loadingService: LoadingService,
              public userService: UserService,
              public storage: storageService,) {
  }

  ionViewDidLoad() {
    let loading = this.loadingService.presentLoading();

    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(responseUser => {
        this.pessoa = responseUser.pessoa;
      },
        error => {
          console.log(error);

        })

    loading.dismiss();
  }

  altera(){
    console.log('Altera');
    
  }
}
