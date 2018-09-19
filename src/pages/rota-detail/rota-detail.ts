import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotaBuscaResponseDTO } from '../../models/rota/RotaBuscaResponseDTO';

/**
 * Generated class for the RotaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rota-detail',
  templateUrl: 'rota-detail.html',
})
export class RotaDetailPage {

  rotaBuscaResponseDTO : RotaBuscaResponseDTO ;
  hasValue : string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              ) {
    this.rotaBuscaResponseDTO = this.navParams.get('rotaBuscaResponseDTO');

    
  }

  abrirMaps(){
    window.location.assign(this.rotaBuscaResponseDTO.urlRota);
  }

  ionViewDidLoad() {
    if(!this.navParams.get('rotaBuscaResponseDTO')){
      this.navCtrl.setRoot('RotasPage');
    }
  }

  

}
