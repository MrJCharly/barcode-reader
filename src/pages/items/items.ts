import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { GlobalProvider } from "../../providers/global/global";
import { BarcodePage } from '../barcode/barcode';

// Seleccionar ítems para generar un pedido.
@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  code = '';
  user = null;

  constructor (
    private navCtrl: NavController,
    private navParams: NavParams,
    private util: UtilProvider,
    private global: GlobalProvider,
    private alertCtrl: AlertController) {
      /*this.global.curr_branch = {
        name: 'Test branch'
      };*/
  }

  ionViewDidLoad() { }

  ionViewDidEnter() {
    this.onAfterBarcodeReading();
  }

  // Procesar lectura de código de barra.
  onAfterBarcodeReading() {
    switch (this.global.reading_status) {
      case this.global.READING_USER:
        this.onReadingUser();
        break;
      case this.global.READING_PRODUCT:
        this.onReadingProduct();
        break;
      case this.global.READING_CANCEL:
        this.onReadingCancel();
        break;
      case this.global.READING_ERROR:
        this.onReadingError();
        break;
    }

    // Lectura finalizada.
    this.global.reading_status = this.global.READING_OFF;
  }

  // Realizar búsqueda de usuario.
  onReadingUser() {
    let code = this.global.barcode_data.text;
    this.getUserByCode(code);
  }

  onReadingProduct() {

  }

  onReadingCancel() {

  }

  onReadingError() {
    //this.code = 'Error';
  }

  // Iniciar captura de código de barra de usuario.
  getUserByBarcode() {
    this.global.reading_status = this.global.READING_USER;
    this.startBarcodeReading();
  }

  // Ingresar código de usuario manualmente.
  promptUsuario() {
    const prompt = this.alertCtrl.create({
      title: 'Ingresar usuario',
      message: "Ingresar identificación de usuario",
      inputs: [{
        name: 'code',
        placeholder: 'Código de usuario'
      }],
      buttons: [{
        text: 'Buscar',
        handler: data => {
          if (!data.code) {
            this.util.showToast({message: 'Ingresar un código de usuario.'});
            return false;
          }

          this.getUserByCode(data.code);
        }
      }]
    });

    prompt.present();
  }

  // Buscar usuario por código y mostrar datos personales.
  getUserByCode(code) {
    let loader = this.util.getLoader();

    this.global.getUserByCode(code).subscribe(data => {
      this.user = data.response.data.records.User;
      loader.dismiss();
    }, error => {
      this.util.showToast(error);
      loader.dismiss();
    });
  }

  // Redireccionar a la página BarcodePage para iniciar lectura.
  startBarcodeReading() {
    this.navCtrl.push(BarcodePage);
  }

}
