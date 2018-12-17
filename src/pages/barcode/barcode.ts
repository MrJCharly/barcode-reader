import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuantityPage } from '../quantity/quantity';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GlobalProvider } from "../../providers/global/global";

@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {

  constructor (
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private navParams: NavParams,
    private global: GlobalProvider) {}

  ionViewDidLoad() {
    this.barcodeScanner.scan({
      prompt: "Enfocar el código de barras dentro del rectángulo."
    }).then(barcodeData => {
      this.global.barcodeData = barcodeData;
      this.navCtrl.pop();
    }).catch(err => {
      console.log('Error', err);
      //this.navCtrl.pop();
    });
  }
}
