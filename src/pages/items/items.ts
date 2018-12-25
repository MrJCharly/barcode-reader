import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { GlobalProvider } from "../../providers/global/global";
import { BarcodePage } from '../barcode/barcode';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

// Seleccionar ítems para generar un pedido.
@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  user = null;
  items = [];
  options: Object = {
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'penColor': '#666a73'
  };

  @ViewChild(SignaturePad) signaturepad: SignaturePad;
  @ViewChild(Content) content: Content;

  constructor (
    private navCtrl: NavController,
    private util: UtilProvider,
    private global: GlobalProvider) { }

  ionViewDidLoad() {
    this.canvasResize();
  }

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
      this.util.showErrorsToast(error);
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

    this.global.getProductBranchByCode(code).subscribe((data: any) => {
      let product = data.response.data.records.Product;

      this.items.push({
        product,
        qty: 1
      });
      console.log(data);
      loader.dismiss();
    }, error => {
      this.util.showErrorsToast(error);
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

  // Limpiar firma.
  clear() {
    this.signaturepad.clear();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');

    this.signaturepad.set('canvasWidth', canvas.offsetWidth);
    this.signaturepad.set('canvasHeight', canvas.offsetHeight);
  }

  isFormValid() {
    return (this.user && this.user.id > 0) &&
      (this.items.length > 0) &&
      (!this.signaturepad.isEmpty());
  }

  canCancel() {
    return (this.user && this.user.id > 0) ||
      (this.items.length > 0) ||
      (!this.signaturepad.isEmpty());
  }

  // Enviar pedido.
  onSubmit() {
    let loader = this.util.getLoader();
    let params = {
      user: this.user,
      items: this.items,
      signature: this.signaturepad.toDataURL()
    };

    this.global.stockMovement(params).subscribe(data => {
      // Informar pedido eviado correctamente.
      let toast = this.util.showToast({
        message: 'Pedido recibido.'
      }, () => {
        this.reset();
        loader.dismiss();
      });
    }, error => {
      loader.dismiss();
      this.util.showErrorsToast(error);
    });
  }

  // Cancelar pedido.
  onCancel() {
    this.util.promptCancelSubmit(this);
  }

  // Resetear campos.
  reset() {
    this.user = null;
    this.items = [];
    this.clear();
    this.content.scrollToTop();
  }
}
