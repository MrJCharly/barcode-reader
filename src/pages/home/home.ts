import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodePage } from '../barcode/barcode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onTap() {
    this.goToNextPage();
  }

  goToNextPage() {
    this.navCtrl.push(BarcodePage);
  }
}
