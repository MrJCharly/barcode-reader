import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

// Seleccionar ítems para generar un pedido.
@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider) {
  }

  ionViewDidLoad() { }
}
