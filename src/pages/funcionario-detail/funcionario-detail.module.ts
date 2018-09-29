import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioDetailPage } from './funcionario-detail';

@NgModule({
  declarations: [
    FuncionarioDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioDetailPage),
  ],
})
export class FuncionarioDetailPageModule {}
