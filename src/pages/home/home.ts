import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuantityPage } from '../quantity/quantity';

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
    this.navCtrl.push(QuantityPage);
  }
}
