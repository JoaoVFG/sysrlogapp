import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Endereco } from '../../models/endereco.dto';
import { cep } from '../../models/cep.dto';
import { Pessoa } from '../../models/pessoa.dto';
import { CepCompleto } from '../../models/cepCompleto.dto';
import { EnderecoService } from '../../Service/Entity/endereco.service';
import { UserService } from '../../Service/Entity/user.service';
import { storageService } from '../../Service/storage.service';

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

  cepEnd : CepCompleto;
  pessoa : Pessoa;

  endereco : Endereco;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public enderecoService : EnderecoService,
    public userService : UserService,
    public storage: storageService) {
  }

  ionViewDidLoad() {
    this.userService.findById(this.storage.retrieveIdUser())
      .subscribe(response =>{

        this.enderecoService.findByPessoa(response.pessoa.id)
          .subscribe(responseEndereco =>{
            this.endereco = responseEndereco;

            console.log(this.endereco);
            
          })

      })
  }

}
