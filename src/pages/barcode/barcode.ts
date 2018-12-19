import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GlobalProvider } from "../../providers/global/global";

// Página para la lectura de códigos de barra.
@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {

  constructor (
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private global: GlobalProvider) {}

  ionViewDidLoad() {
    this.startBarcodeReading();
  }

  // Iniciar lectura automáticamente e informar el estado del proceso al
  // finalizar.
  startBarcodeReading() {
    this.barcodeScanner.scan({
      prompt: "Enfocar el código de barras dentro del rectángulo."
    }).then(barcode_data => {
      if (barcode_data.cancelled) {
        this.global.reading_status = this.global.READING_CANCEL;
      }

      this.global.barcode_data = barcode_data;
      this.navCtrl.pop();
    }).catch(error => {
      console.log('Error', error);
      this.global.barcode_data = null;
      this.global.barcode_error = error;
      this.global.reading_status = this.global.READING_ERROR;
      this.navCtrl.pop();
    });
  }
}
