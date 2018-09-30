import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CepsPage } from './ceps';

@NgModule({
  declarations: [
    CepsPage,
  ],
  imports: [
    IonicPageModule.forChild(CepsPage),
  ],
})
export class CepsPageModule {}
