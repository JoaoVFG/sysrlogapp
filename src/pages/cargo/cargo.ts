import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CargoService } from '../../Service/Entity/cargo.service';
import { Cargo } from '../../models/cargo.dto';
import { LoadingService } from '../../Service/Components/loading.service';

/**
 * Generated class for the CargoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cargo',
  templateUrl: 'cargo.html',
})
export class CargoPage {
  cargoDescricao : string = '';
  cargos : Cargo [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cargoService : CargoService) {
  }

  ionViewDidLoad() {
    this.buscaCargos();
  }
    
  buscaCargos(){
    this.cargoService.findAll()
    .subscribe(response =>{
      this.cargos = response;
    }, error => {
      console.log(error);
      
    })
  }

  cadastrarCargo(){


    this.cargoService.insertCargo(this.cargoDescricao)
      .subscribe(response => {
          this.cargoDescricao = '';
          this.buscaCargos();
      },error =>{
        console.log(error);
        
      })
    
  }

}
