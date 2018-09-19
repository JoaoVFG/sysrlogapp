import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { RotaService } from '../../Service/rota.service';
import { rotaResponse } from '../../models/rota/rotaresponse.dto';
import { storageService } from '../../Service/storage.service';
import { RotaBuscaResponseDTO } from '../../models/rota/RotaBuscaResponseDTO';

@IonicPage()
@Component({
  selector: 'page-rotas',
  templateUrl: 'rotas.html',
})
export class RotasPage {

  rotaBuscaResponseDTO : RotaBuscaResponseDTO = {
    idRota : '',
	  urlRota : '',
	  dataCriacao : '',
	  usuarioCriador : '',
	  empresa :'',
	  listaEnderecoEntrega :  [],
	  responsavelEntregaCepRotas :  []
  }

  rotas : RotaBuscaResponseDTO [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public rotaService: RotaService,
              public modalCtrl: ModalController) {
  }

  openDetailRota(rotaBuscaResponseDTO : RotaBuscaResponseDTO){
    //console.log(rotaBuscaResponseDTO);
    this.navCtrl.push('RotaDetailPage', {'rotaBuscaResponseDTO' : rotaBuscaResponseDTO});
  }

  ionViewDidLoad() {
    this.rotaService.findByUser()
      .subscribe((response)=>{
        this.rotas = response;   
      })
  }

  

}

