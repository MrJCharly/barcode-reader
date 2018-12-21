import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { GlobalProvider } from "../../providers/global/global";
import { BarcodePage } from '../barcode/barcode';
import { SucursalesesPage } from '../sucursaleses/sucursaleses';

// Seleccionar ítems para generar un pedido.
@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  user = null;
  items = [{
    product: {
      id: 1,
      name: 'Casco'
    },
    qty: 1
  }, {
    product: {
      id: 1,
      name: 'Guantes'
    },
    qty: 1
  }];
  signature = "SIGNATURE";

  constructor (
    private navCtrl: NavController,
    private navParams: NavParams,
    private util: UtilProvider,
    private global: GlobalProvider,
    private alertCtrl: AlertController) { }

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
    let code = this.global.barcode_data.text;
    this.getItemByCode(code);
  }

  onReadingCancel() {
    // TBD
  }

  onReadingError() {
    // TBD
  }

  // Iniciar captura de código de barra de usuario.
  getUserByBarcode() {
    this.global.reading_status = this.global.READING_USER;
    this.startBarcodeReading();
    //this.navCtrl.push(SucursalesesPage);
  }

  // Ingresar código de usuario manualmente.
  promptUsuario() {
    this.util.promptUsuario(this);
  }

  // Buscar usuario por código y mostrar datos personales.
  getUserByCode(code) {
    let loader = this.util.getLoader();

    this.global.getUserByCode(code).subscribe((data: any) => {
      this.user = data.response.data.records.User;

      if (!this.user) {
        this.util.showToast({message: 'Usuario inexistente.'});
        loader.dismiss();
        return;
      }

      loader.dismiss();
    }, error => {
      this.util.showToast(error);
      loader.dismiss();
    });
  }

  // Iniciar lectura de código de barras de producto.
  addItemByBarcode() {
    this.global.reading_status = this.global.READING_PRODUCT;
    this.startBarcodeReading();
  }

  // Ingresar código de producto.
  addItemByCode() {
    this.util.promptItemCode(this);
  }

  // Buscar producto por código y agregarlo al listado de items.
  getItemByCode(code) {
    let loader = this.util.getLoader();

    this.global.getProductByCode(code).subscribe((data: any) => {
      let product = data.response.data.records.Product;

      if (!product) {
        this.util.showToast({message: 'Producto inexistente.'});
        loader.dismiss();
        return;
      }

      this.items.push({
        product,
        qty: 1
      });
      console.log(data);
      loader.dismiss();
    }, error => {
      this.util.showToast(error);
      loader.dismiss();
    });
  }

  setQty(item, qty) {
    item.qty += qty;

    // Eliminar elemento si cantidad <= 0.
    if (item.qty <= 0) {
      this.items.splice(this.items.indexOf(item), 1);
    }
  }

  // Redireccionar a la página BarcodePage para iniciar lectura.
  startBarcodeReading() {
    this.navCtrl.push(BarcodePage);
  }

  onValueChange(value) {
    this.signature = value;
  }
}
