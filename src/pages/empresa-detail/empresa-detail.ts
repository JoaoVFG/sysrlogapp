import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Empresa } from '../../models/empresa.dto';
import { Endereco } from '../../models/endereco.dto';
import { EmpresaService } from '../../Service/Entity/empresa.service';
import { EnderecoService } from '../../Service/Entity/endereco.service';
import { Pessoa } from '../../models/pessoa.dto';
import { TipoEmpresa } from '../../models/tipoEmpresa.dto';


@IonicPage()
@Component({
  selector: 'page-empresa-detail',
  templateUrl: 'empresa-detail.html',
})
export class EmpresaDetailPage {
  tipoEmpresa: TipoEmpresa = {
    descricao: '',
    id: ''
  }
  empresa: Empresa = {
    id: '',
    empresaMatriz: '',
    pessoa: undefined,
    tipoEmpresa: this.tipoEmpresa,
    transportadora: ''
  };

  

  pessoa: Pessoa = {
    cnpj: '',
    cpf: '',
    dataNascimento: '',
    id: '',
    nome: '',
    razaoSocial: '',
    tipo: undefined,
    sexo: ''
  }
  endereco: Endereco;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaService: EmpresaService,
    public enderecoService: EnderecoService) {

    this.empresa = this.navParams.get('empresa');
    this.getEndereco();

  }

  ionViewDidLoad() {
    if (!this.navParams.get('empresa')) {
      this.navCtrl.setRoot('RotasPage');
    }
  }

  getEndereco() {
    this.enderecoService.findByPessoa(this.empresa.pessoa.id)
      .subscribe(responseEndereco => {
        this.endereco = responseEndereco;
      },
        error => {

        });
  }
}
