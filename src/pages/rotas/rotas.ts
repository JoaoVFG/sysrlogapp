import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotaService } from '../../Service/rota.service';

@IonicPage()
@Component({
  selector: 'page-rotas',
  templateUrl: 'rotas.html',
})
export class RotasPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public rotaService: RotaService) {
  }

  ionViewDidLoad() {

  }

}
