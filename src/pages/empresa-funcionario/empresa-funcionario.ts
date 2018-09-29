import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Funcionario } from '../../models/funcionario.dto';
import { FuncionarioService } from '../../Service/Entity/funcionario.service';


@IonicPage()
@Component({
  selector: 'page-empresa-funcionario',
  templateUrl: 'empresa-funcionario.html',
})
export class EmpresaFuncionarioPage {
  idEmpresa : string;
  funcionarios : Funcionario[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public funcioraioService : FuncionarioService) {

      this.idEmpresa = this.navParams.get('idEmpresa');
      

  }

  ionViewDidLoad() {
    console.log('entrando');
    
    this.funcioraioService.findByEmpresa(this.idEmpresa)
      .subscribe(response => {
        this.funcionarios = response;
      }, error => {
        console.log(error);
      })
  }

}
