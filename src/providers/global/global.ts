import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../config';

@Injectable()
export class GlobalProvider {
  public token;

  constructor(    
    public http: HttpClient) { }

  getUrl() {
    return config.base_url + config.intranet + '/';
  }

  login(email, password) {
    let url = this.getUrl() + 'users/gettoken';
    let params = {email, password};
    return this.http.post(url, params);
  }
}
