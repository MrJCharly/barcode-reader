import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { UtilProvider } from "../../providers/util/util";
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
    public menuCtrl: MenuController,
    public global: GlobalProvider,
    public util: UtilProvider,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['nicorives81@gmail.com', Validators.required],
      password: ['1111111a', Validators.required]
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  onLogin() {
    let loading = this.util.getLoader();
    let {email, password} = this.loginForm.controls;

    this.global.login(email.value, password.value).subscribe(data => {
      this.setLoginData(data);
      this.global.loadbranches().subscribe(branches => {
        loading.dismiss();
        this.setBranches(branches);
        this.goToNextPage();
      }, error => {
        loading.dismiss();
        this.util.showErrorsToast(error);
      });
    }, error => {
      loading.dismiss();
      this.util.showErrorsToast(error);
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
    this.navCtrl.setRoot(SucursalesesPage);
  }
}
