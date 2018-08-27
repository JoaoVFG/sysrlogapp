import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaService } from '../../Service/Entity/pessoa.service';
import { storageService } from '../../Service/storage.service';
import { Pessoa } from '../../models/pessoa.dto';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  pessoa : Pessoa;
  email : string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public pessoaService : PessoaService,
              public storage : storageService) {
    
                this.email = this.storage.retriveEmail();
  }

  ionViewDidLoad() {
    this.pessoaService.findById(this.storage.retrieveIdUser())
      .subscribe( response =>{
        this.pessoa = response;
      },
    error => {
      console.log(error);
    })
  }

}
