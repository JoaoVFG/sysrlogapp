import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cidade } from '../../models/cidade.dto';
import { Estado } from '../../models/estado.dto';
import { cep } from '../../models/cep.dto';
import { CepService } from '../../Service/Entity/cep.service';
import { CepCompleto } from '../../models/cepCompleto.dto';

/**
 * Generated class for the CepsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ceps',
  templateUrl: 'ceps.html',
})
export class CepsPage {

  ceps: cep[];
  cepsCompleto : CepCompleto[];
  cep: cep;
  
  modoBusca: string = '';

  cidades: Cidade[];
  estados: Estado[];
  


  cepBusca: string;
  cidadeBusca: string;
  estadoBusca: string;
  bairroBusca: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cepService: CepService) {
  }

  ionViewDidLoad() {

  }

  busca() {
    switch (this.modoBusca) {
      case 'todos':
        this.findAll();
        break;
      case 'cep':
        this.findCep();
        break;
      case 'estadoCidade':
        this.findCepEstadoCidade();
        break;
      case 'cidadeBairro':
        this.findCepCidadeBairro();
        break; 
      default:
        console.log('DoNothing');
        break;

    }
  }

  findAll() {
    this.cepService.findAllCep()
      .subscribe(response => {
        this.ceps = response;


      }, error => {
        console.log(error);

      })
  }

  findCep() {
    this.cepService.findByCep(this.cepBusca)
      .subscribe(response => {
        this.cep = response;
      }, error => {
        console.log(error);
      })
  }

  findCepEstadoCidade() {
    this.cepService.findByEstadoCidade(this.estadoBusca, this.cidadeBusca)
      .subscribe(response => {
        this.cepsCompleto = response
      }, error => {
        console.log(error);

      })
  }

  findCepCidadeBairro() {
    this.cepService.findByCidadeBairro( this.cidadeBusca, this.bairroBusca)
      .subscribe(response => {
        this.cepsCompleto = response;


      }, error => {
        console.log(error);
      })
  }

  buscaEstados() {
    if (!this.estados) {
      this.cepService.findEstados()
        .subscribe(response => {
          this.estados = response;


        }, error => {
          console.log(error);

        })
    }
  }

  buscaCidades() {
    this.cepService.findCidadesByEstado(this.estadoBusca)
      .subscribe(response => {
        this.cidades = response;


      }, error => {
        console.log(error);

      })
  }

  novaBusca(){
    this.ceps = undefined;
    this.cep = undefined;
    this.cepBusca = '';
    this.cidadeBusca = '';
    this.estadoBusca = '';
    this.bairroBusca = '';
    this.modoBusca = '';
  }
}
