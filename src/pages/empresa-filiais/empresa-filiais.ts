import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Empresa } from '../../models/empresa.dto';
import { EmpresaService } from '../../Service/Entity/empresa.service';



@IonicPage()
@Component({
  selector: 'page-empresa-filiais',
  templateUrl: 'empresa-filiais.html',
})
export class EmpresaFiliaisPage {
  
  filiais: Empresa[];
  empresa: Empresa;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public empresaService : EmpresaService) {

    this.empresa = this.navParams.get('empresa');
    this.buscaFiliais();
  }

  openEmpresaDetail(empresaDetail : Empresa){
    this.navCtrl.push('EmpresaDetailPage', {'empresa': empresaDetail})  
  }

  buscaFiliais(){
    let idMatriz: string;
    if (this.empresa.empresaMatriz) {
      idMatriz = this.empresa.empresaMatriz;
    } else {
      idMatriz = this.empresa.pessoa.id
    }

    this.empresaService.findByMatriz(idMatriz)
      .subscribe(responseEmpresas => {
        this.filiais = responseEmpresas;
      },
        error => {
          console.log(error)
        })
  }

  ionViewDidLoad() {
    if (!this.navParams.get('empresa')) {
      this.navCtrl.setRoot('RotasPage');
    }
  }

}
