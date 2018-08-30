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
import { Geolocation } from '@ionic-native/geolocation';
import { WaypointsGoogle } from '../../models/rota/waypointsGoogle';
declare var google;

@IonicPage()
@Component({
  selector: 'page-rota',
  templateUrl: 'rota.html',
})
export class RotaPage {
  /*
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  waypointsGoogle : WaypointsGoogle[] = [];
  */
  listaEndereco: listaEnderecoEntregaDTO = {
    idUser: this.storage.retrieveIdUser(),
    waypoints: []
  }

  enderecoEntrega: enderecoEntregaDTO = {
    cep: '',
    numeroLogradouro: ''
  };

  rotaResponse: rotaResponse = {
    waypoints: '',
    enderecoOrigem: [],
    rota: '',
    responsavel: []
  }

  responsavelRegiao: ResponsavelRegiao = {
    cep: '',
    empresa: ''
  }
  

  URL: string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rotaService: RotaService,
    public storage: storageService,
    public loadingService: LoadingService,
    public cepService: CepService) {
  }

  ionViewDidLoad() {

  }

  validaCep() {
    this.cepService.findByCep(this.enderecoEntrega.cep)
      .subscribe((response) => {
        this.addToList();
      }, error => {
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
        //this.initializeMap();
      },
        error => {
          loading.dismiss();
          console.log(error);
        })

  }
  /**
  abrirMaps() {
    window.location.assign(this.rotaResponse.rota);
  }

  initializeMap() {
    this.startPosition = new google.maps.LatLng( -23.533773, -46.625290);

    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: false
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.calculateRoute();
    this.directionsDisplay.setMap(this.map);

  }

  calculateRoute() {
    const request = {
      // Pode ser uma coordenada (LatLng), uma string ou um lugar
      origin: this.rotaResponse.enderecoOrigem,
      destination: this.rotaResponse.enderecoOrigem,
      waypoints: this.generateWayPoints(),
      travelMode: 'DRIVING'
    };

    this.traceRoute(this.directionsService, this.directionsDisplay, request);
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

  generateWayPoints() {
    
    for (let i of this.rotaResponse.waypoints) {
      this.waypointsGoogle.push({
        location: i,
        stopover: true
      })

      console.log(this.waypointsGoogle.toString);
      
      
    }
    return this.waypointsGoogle;
  }
  **/
}

