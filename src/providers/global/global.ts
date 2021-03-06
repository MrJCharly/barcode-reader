import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../config';

// Contenedor de datos y funciones de uso general a nivel de aplicación.
@Injectable()
export class GlobalProvider {
  public READING_OFF = 'READING_OFF';
  public READING_USER = 'READING_USER';
  public READING_PRODUCT = 'READING_PRODUCT';
  public READING_CANCEL = 'READING_CANCEL';
  public READING_ERROR = 'READING_ERROR';

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
  // Estado de lectura de código de barras.
  public reading_status;
  // Datos obtenidos de la lectura de código de barras.
  public barcode_data;
  // Error en la lectura.
  public barcode_error;

  constructor(
    public http: HttpClient) {
      this.reading_status = this.READING_OFF;
    }

  // Generar url a partir de un identificador de endpoint. El endpoint concreto
  // se obtiene desde el objeto this.endpoints que se recibe luego del login.
  getUrlWithEndpoint(endpoint_name) {
    let endpoint = this.endpoints[endpoint_name];
    return this.getUrl(endpoint);
  }

  // Generar url a partir de un endpoint concreto.
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

  getUserByCode(code) {
    let url = this.getUrlWithEndpoint('getUserbyCode');
    let params = {barcode: code};
    params = this.injectToken(params);

    return this.http.post(url, params);
  }

  // Buscar producto por código y por branch.
  getProductBranchByCode(code) {
    let url = this.getUrlWithEndpoint('getProductBranchByCode');
    let params = {code, branch_id: this.curr_branch.id};
    params = this.injectToken(params);

    return this.http.post(url, params);
  }

  // Enviar pedido.
  stockMovement(movement) {console.log(this.curr_branch);
    let url = this.getUrlWithEndpoint('stockMovement');
    let params = {
      branch_id: this.curr_branch.id,
      user_id: movement.user.id,
      signature: movement.signature,
      products: this.getProductsParam(movement.items)
    };
    params = this.injectToken(params);

    return this.http.post(url, params);
  }

  // Preparar parámetro products usando lista de items.
  getProductsParam(items) {
    return items.map(item => {
      return {
        id: item.product.id,
        quantity: item.qty
      }
    });
  }

  // Inyectar token a un objeto como parámetro.
  injectToken(params) {
    return {uuid: this.token, ...params};
  }
}
