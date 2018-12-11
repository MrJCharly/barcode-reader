import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../config';

@Injectable()
export class GlobalProvider {
  public token;
  public endpoints;
  public User;
  public branches;

  constructor(
    public http: HttpClient) { }

  getUrl(endpoint) {
    return config.base_url + config.intranet + '/' + endpoint;
  }

  login(email, password) {
    let url = this.getUrl('users/gettoken');
    let params = {email, password};

    return this.http.post(url, params);
  }

  loadbranches() {
    let endpoint = this.endpoints.getUserBranches;
    let url = this.getUrl(endpoint);
    let params = {uuid: this.token};

    return this.http.post(url, params);
  }
}
