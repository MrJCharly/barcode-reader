import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuantityPage } from '../quantity/quantity';

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
  }

  onTap() {
    this.goToNextPage();
  }

  goToNextPage() {
    this.navCtrl.push(QuantityPage);
  }
}
