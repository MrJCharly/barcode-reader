import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BarcodePage } from '../barcode/barcode';

// Seleccionar ítems para generar un pedido.
@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private global: GlobalProvider,
    private barcodeScanner: BarcodeScanner) {
      this.global.curr_branch = {
        name: 'Test branch'
      };
  }

  ionViewDidLoad() { }

  ionViewDidEnter() {
    if (this.global.reading_user) {
      console.log('READING USER...');
    }
  }

  getUserByBarcode() {
    this.global.reading_user = true;
    this.navCtrl.push(BarcodePage);
  }
}
