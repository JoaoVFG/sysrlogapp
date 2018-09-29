import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaFuncionarioPage } from './empresa-funcionario';

@NgModule({
  declarations: [
    EmpresaFuncionarioPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaFuncionarioPage),
  ],
})
export class EmpresaFuncionarioPageModule {}
