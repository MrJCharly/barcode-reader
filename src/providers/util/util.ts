import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

@Injectable()
export class UtilProvider {
  default_loader_options = {

  };

  default_toast_options = {
    duration: 3000,
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: 'Ok'
  };

  constructor (
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private global: GlobalProvider) { }

  getLoader(options = {}) {
    let merged_options = {...this.default_loader_options, ...options};
    let loading = this.loadingCtrl.create(merged_options);
    loading.present();

    return loading;
  }

  showToast(options = {}) {
    let merged_options = {...this.default_toast_options, ...options};
    let toast = this.toastCtrl.create(merged_options);
    toast.present();

    return toast;
  }

}
