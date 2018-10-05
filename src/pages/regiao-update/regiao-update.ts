import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CepService } from '../../Service/Entity/cep.service';
import { RegiaoService } from '../../Service/Entity/regiao.service';
import { Empresa } from '../../models/empresa.dto';
import { cep } from '../../models/cep.dto';
import { CepCompleto } from '../../models/cepCompleto.dto';
import { Cidade } from '../../models/cidade.dto';
import { Estado } from '../../models/estado.dto';
import { InsertRegiaoByCidadeDTO } from '../../models/regiao/InsertRegiaoByCidade.dto';
import { InsertRegiaoByBairroDTO } from '../../models/regiao/insertRegiaoByBairro.dto';
import { Regiao } from '../../models/regiao.dto';

/**
 * Generated class for the RegiaoUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regiao-update',
  templateUrl: 'regiao-update.html',
})
export class RegiaoUpdatePage {

  empresa: Empresa;
  regiao: Regiao;
  cepsCompleto: CepCompleto[];
  cep: cep;
  updateDescricao: string;
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
    public cepService: CepService,
    public regiaoService: RegiaoService,
    public alertController: AlertController) {
    this.regiao = this.navParams.get('regiao');
  }

  ionViewDidLoad() {

  }

  criarRegiao() {

  }

  removeCepFromRegiao(cep: CepCompleto) {


    let index = this.regiao.ceps.findIndex(c => c.id == cep.id);
    this.regiao.ceps.splice(index, 1);


  }

  addCepToRegiao(cep: CepCompleto) {
    let index = this.cepsCompleto.findIndex(c => c.id == cep.id);
    this.cepsCompleto.splice(index, 1);
    if (this.verificaCadastrado(cep)) {
      this.regiao.ceps.push(cep)
    } else {
      console.log('Ja esta cadastrado');
    }

  }

  adicionarTodos() {

    this.cepsCompleto.forEach(cep => {
      let index = this.cepsCompleto.findIndex(c => c.id == cep.id);
      if (this.verificaCadastrado(cep)) {
        this.regiao.ceps.push(cep)
      } else {
        console.log('Ja esta cadastrado');
      }
    })

    this.cepsCompleto = [];
    
  }

  removerTodos() {
    this.regiao.ceps = [];
  }

  salvarAlteracao() {
    this.regiaoService.update(this.regiao)
      .subscribe(response => {
        console.log(response);
        this.navCtrl.setRoot('RegiaoPage')
      }, error => {
        console.log(error);
        
      })
  }

  verificaCadastrado(cep: CepCompleto): boolean {
    let index = this.regiao.ceps.findIndex(c => c.id == cep.id)
    if (index == -1) {
      return true;
    } else {
      return false;
    }
  }

  busca() {
    switch (this.modoBusca) {
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

  findCepEstadoCidade() {
    this.cepService.findByEstadoCidade(this.estadoBusca, this.cidadeBusca)
      .subscribe(response => {
        this.cepsCompleto = response
      }, error => {
        console.log(error);

      })
  }

  findCepCidadeBairro() {
    this.cepService.findByCidadeBairro(this.cidadeBusca, this.bairroBusca)
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

  showInsertOk() {
    let alert = this.alertController.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.push('EmpresaPage');
          }
        }
      ]
    });
    alert.present();
  }

  novaBusca() {
    this.cep = undefined;
    this.cepBusca = '';
    this.cidadeBusca = '';
    this.estadoBusca = '';
    this.bairroBusca = '';
    this.modoBusca = '';
    this.cepsCompleto = undefined
  }

}
