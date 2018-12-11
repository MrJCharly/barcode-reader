import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalesesPage } from '../sucursaleses/sucursaleses';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['nicorives81@gmail.com', Validators.required],
      password: ['1111111a', Validators.required]
    });
  }

  ionViewDidLoad() { }

  onLogin() {
    let loading = this.loadingCtrl.create({});
    let {email, password} = this.loginForm.controls;

    loading.present();
    this.global.login(email.value, password.value).subscribe(data => {
      this.setLoginData(data);
      this.global.loadbranches().subscribe(branches => {
        loading.dismiss();
        this.setBranches(branches);
        this.goToNextPage();
      }, error => {
        loading.dismiss();
        console.log(error);
      });
    }, error => {
      loading.dismiss();
      console.log(error);
      this.showLoginFailedMessage();
    });
  }

  setLoginData(data) {
    let {User, token, endpoints} = data.response.data;

    this.global.User = User;
    this.global.token = token;
    this.global.endpoints = endpoints;
  }

  setBranches(branches) {
    this.global.branches = branches.response.data.records;
  }

  goToNextPage() {
    this.navCtrl.push(SucursalesesPage);
  }

  showLoginFailedMessage() {
    let toast = this.toastCtrl.create({
      message: 'Credenciales inválidas, intente nuevamente.',
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });

    toast.present();
  }
}
