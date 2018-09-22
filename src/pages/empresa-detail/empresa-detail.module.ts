import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaDetailPage } from './empresa-detail';

@NgModule({
  declarations: [
    EmpresaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaDetailPage),
  ],
})
export class EmpresaDetailPageModule {}
