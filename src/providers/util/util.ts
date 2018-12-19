import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
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
    private global: GlobalProvider,
    private alertCtrl: AlertController) { }

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

  // Ingresar código de producto en forma manual en GlobalProvider.
  promptItemCode(ctx) {
    const prompt = this.alertCtrl.create({
      title: 'Ingresar producto',
      message: "Ingresar código de producto",
      inputs: [{
        name: 'code',
        placeholder: 'Código de producto'
      }],
      buttons: [{
        text: 'Ingresar',
        handler: data => {
          if (!data.code) {
            this.showToast({message: 'Ingresar un código de producto.'});
            return false;
          }

          ctx.getItemByCode(data.code);
        }
      },{
        text: 'Cancelar'
      }]
    });

    prompt.present();
  }
}
