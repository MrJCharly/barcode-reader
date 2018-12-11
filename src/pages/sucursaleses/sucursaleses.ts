import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

@IonicPage()
@Component({
  selector: 'page-sucursaleses',
  templateUrl: 'sucursaleses.html',
})
export class SucursalesesPage {

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider) {
  }

  ionViewDidLoad() { }

}
