import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import config from '../../config';

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
    private alertCtrl: AlertController) { }

  getLoader(options = {}) {
    let merged_options = {...this.default_loader_options, ...options};
    let loading = this.loadingCtrl.create(merged_options);
    loading.present();

    return loading;
  }

  showToast(options = {}, onDismiss = null) {
    let merged_options = {...this.default_toast_options, ...options};
    let toast = this.toastCtrl.create(merged_options);
    toast.present();

    toast.onDidDismiss(() => {
      if (onDismiss) {
        onDismiss();
      }
    });

    return toast;
  }

  // Mostrar errores en múltiples líneas.
  showErrorsToast(err) {
    let message = (err.status != 0) ?
      err.error.response.errors.map(item => {
        return item.error;
      }).join('\n') :
      config.messages.network_error;


    this.showToast({ message: message });
  }

  // Ingresar código de usuario manualmente.
  promptUsuario(ctx) {
    const prompt = this.alertCtrl.create({
      title: 'Ingresar usuario',
      message: "Ingresar identificación de usuario",
      inputs: [{
        name: 'code',
        placeholder: 'Código de usuario'
      }],
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Buscar',
        handler: data => {
          if (!data.code) {
            this.showToast({message: 'Ingresar un código de usuario.'});
            return false;
          }

          ctx.getUserByCode(data.code);
        }
      }]
    });

    prompt.present();
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
        text: 'Cancelar'
      }, {
        text: 'Buscar',
        handler: data => {
          if (!data.code) {
            this.showToast({message: 'Ingresar un código de producto.'});
            return false;
          }

          ctx.getItemByCode(data.code);
        }
      }]
    });

    prompt.present();
  }

  // Cancelar pedido.
  promptCancelSubmit(ctx) {
    const prompt = this.alertCtrl.create({
      title: "¿Cancelar pedido?",
      buttons: [{
        text: 'No'
      }, {
        text: 'Si',
        handler: () => {
          ctx.reset();
        }
      }]
    });

    prompt.present();
  }
}
