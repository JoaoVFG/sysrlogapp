import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RotaDetailPage } from './rota-detail';

@NgModule({
  declarations: [
    RotaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RotaDetailPage),
  ],
})
export class RotaDetailPageModule {}
