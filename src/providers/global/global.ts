import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../config';

// Contenedor de datos y funciones de uso general a nivel de aplicación.
@Injectable()
export class GlobalProvider {
  // Token de usuario.
  public token;
  // Lista de endpoints.
  public endpoints;
  // Usuario actual.
  public User;
  // Lista de branches del usuario actual.
  public branches;
  // Branch actual.
  public curr_branch;
  // True si se inició lectura de usuario.
  public reading_user = false;

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
