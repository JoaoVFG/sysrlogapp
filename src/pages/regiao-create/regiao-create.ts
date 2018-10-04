import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Empresa } from '../../models/empresa.dto';
import { cep } from '../../models/cep.dto';
import { CepCompleto } from '../../models/cepCompleto.dto';
import { Cidade } from '../../models/cidade.dto';
import { Estado } from '../../models/estado.dto';
import { CepService } from '../../Service/Entity/cep.service';
import { InsertRegiaoByCidadeDTO } from '../../models/regiao/InsertRegiaoByCidade.dto';
import { InsertRegiaoByBairroDTO } from '../../models/regiao/insertRegiaoByBairro.dto';
import { RegiaoService } from '../../Service/Entity/regiao.service';

/**
 * Generated class for the RegiaoCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regiao-create',
  templateUrl: 'regiao-create.html',
})
export class RegiaoCreatePage {
  empresa: Empresa;

  ceps: cep[];
  cepsCompleto: CepCompleto[];
  cep: cep;

  modoBusca: string = '';

  cidades: Cidade[];
  estados: Estado[];

  descricao: string;

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
    this.empresa = this.navParams.get('empresa');
    console.log(this.empresa);

  }

  ionViewDidLoad() {

  }


  criarRegiao() {
    if (this.modoBusca == 'estadoCidade') {
      let insertRegiao: InsertRegiaoByCidadeDTO = {
        cidade: this.cidadeBusca,
        descricao: this.descricao,
        empresaId: this.empresa.id,
        estado: this.estadoBusca
      }

      this.regiaoService.insertRegiaoByCidade(insertRegiao)
        .subscribe(response => {
          this.showInsertOk();

        }, error => {
          console.log(error);

        })

    } else {
      let insertRegiao: InsertRegiaoByBairroDTO = {
        cidade: this.cidadeBusca,
        descricao: this.descricao,
        empresaId: this.empresa.id,
        bairro: this.bairroBusca
      }

      this.regiaoService.insertRegiaoByBairro(insertRegiao)
        .subscribe(response => {
          this.showInsertOk();

        }, error => {
          console.log(error);

        })
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
    this.ceps = undefined;
    this.cep = undefined;
    this.cepBusca = '';
    this.cidadeBusca = '';
    this.estadoBusca = '';
    this.bairroBusca = '';
    this.modoBusca = '';
    this.cepsCompleto = undefined
  }
}
