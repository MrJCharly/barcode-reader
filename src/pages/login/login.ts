import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model = {
    email: 'nicorives81@gmail.com',
    password: '1111111a'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public loadingCtrl: LoadingController,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin() {
    let loading = this.loadingCtrl.create({});

    loading.present();
    this.global.login(this.model.email, this.model.password).subscribe(data => {
      console.log(data);
      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }
}
