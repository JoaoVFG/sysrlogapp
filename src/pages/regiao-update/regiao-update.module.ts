import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegiaoUpdatePage } from './regiao-update';
import { RegiaoService } from '../../Service/Entity/regiao.service';

@NgModule({
  declarations: [
    RegiaoUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(RegiaoUpdatePage),
  ], providers : [
    RegiaoService
  ]
})
export class RegiaoUpdatePageModule {}
