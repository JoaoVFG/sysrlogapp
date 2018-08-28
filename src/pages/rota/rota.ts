import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotaService } from '../../Service/rota.service';
import { listaEnderecoEntregaDTO } from '../../models/rota/listaenderecoentrega.dto';
import { enderecoEntregaDTO } from '../../models/rota/enderecoentrega.dto';
import { storageService } from '../../Service/storage.service';
import { rotaResponse } from '../../models/rota/rotaresponse.dto';
import { ResponsavelRegiao } from '../../models/rota/responsavelregiao.dto';
import { LoadingService } from '../../Service/Components/loading.service';
import { CepService } from '../../Service/Entity/cep.service';


@IonicPage()
@Component({
  selector: 'page-rota',
  templateUrl: 'rota.html',
})
export class RotaPage {

  listaEndereco: listaEnderecoEntregaDTO = {
    idUser: this.storage.retrieveIdUser(),
    waypoints: []
  }

  enderecoEntrega: enderecoEntregaDTO = {
    cep: '',
    numeroLogradouro: ''
  };

  rotaResponse : rotaResponse = {
    rota : '',
    responsavel : []
  }

  responsavelRegiao : ResponsavelRegiao = {
    cep : '',
    empresa :''
  }
  
  URL : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public rotaService: RotaService,
              public storage: storageService,
              public loadingService: LoadingService,
              public cepService: CepService) {
  }

  ionViewDidLoad() {

  }
  
  validaCep(){
    this.cepService.findByCep(this.enderecoEntrega.cep)
      .subscribe((response) => {
        console.log('DEU CERTO')
        this.addToList();
      }, error =>{
        console.log(error);
      })
  }

  addToList() {
    this.listaEndereco.waypoints.push({
      cep: this.enderecoEntrega.cep,
      numeroLogradouro: this.enderecoEntrega.numeroLogradouro
    });
  }

  gerarRota() {
    let loading = this.loadingService.presentLoading();
    this.rotaService.geraRotaJson(this.listaEndereco)
      .subscribe(response => {
        this.rotaResponse = JSON.parse(response.body);
        loading.dismiss();
      },
        error => {
          loading.dismiss();
          console.log(error);
        })
    
  }

  abrirMaps(){
    window.location.assign(this.rotaResponse.rota);
  }

}
