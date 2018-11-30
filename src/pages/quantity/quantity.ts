import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SummaryPage } from '../summary/summary';

@IonicPage()
@Component({
  selector: 'page-quantity',
  templateUrl: 'quantity.html',
})
export class QuantityPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuantityPage');
  }

  onTap() {
    this.goToNextPage();
  }

  goToNextPage() {
    this.navCtrl.push(SummaryPage);
  }
}
