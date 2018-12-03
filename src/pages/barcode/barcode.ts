import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuantityPage } from '../quantity/quantity';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    public navCtrl: NavController,
    public navParams: NavParams) {}

  ionViewDidLoad() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.goToNextPage();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  onTap() {
    this.goToNextPage();
  }

  goToNextPage() {
    this.navCtrl.push(QuantityPage);
  }
}
