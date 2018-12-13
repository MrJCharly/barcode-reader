import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { ItemsPage } from '../items/items';

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

  // Seleccionar branch actual y redirigir a página siguiente.
  onSelectBranch(item) {
    this.global.curr_branch = item.Branch;
    this.navCtrl.push(ItemsPage);
  }
}
