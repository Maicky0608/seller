
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from '@app/core';
import { Observable, of } from 'rxjs';



@Injectable()
export class ParamSpecsService {


  constructor(
    private http: HttpClient,
    private api: EndpointService
  ) {
  }

  public getSpecifications(): Observable<any> {
    return this.http.get(this.api.get('getProductSpecs'), { observe: 'response' });
  }

  /**
   * Obtiene.
   *
   * @returns {Observable<any>}
   * @memberof ParamSpecsService
   */
  public getConfigSpecifications(): Observable<any> {
    return this.http.get(this.api.get('getConfigSpecs'));
  }

  public createConfigSpecifications(param: any): Observable<any> {
    return this.http.post(this.api.get('getConfigSpecs'), param, { observe: 'response' });
  }

  public updateConfigSpecifications(data: any): Observable<any> {
    return this.http.patch(this.api.get('getConfigSpecs'), data, { observe: 'response' });
  }

  public deleteConfigSpecifications(param: any): Observable<any> {
    return this.http.delete(this.api.get('getConfigSpecs') + '/' + param, { observe: 'response' });
  }

  public getSpecification(id: number): Observable<{}> {
    return this.http.get(this.api.get('getProductSpecs', [id]));
  }

  public addSpecification(model: any): Observable<any> {
    return of({
      status: 200,
      body: true
    });
    // this.http.patch(this.api.get('getProductSpecs'), model);
  }

  public updateSpecification(model: any): Observable<any> {
    return of({
      status: 200,
      body: true
    });
    // return this.http.post(this.api.get('getProductSpecs'), model);
  }

  /**
   * ELiminar grupo de especificacion
   *
   * @param {*} model
   * @returns {Observable<any>}
   * @memberof ParamSpecsService
   */
  public deleteGroupSpecification(model: any): Observable<any> {
    return of({
      status: 200,
      body: true
    });
    // this.http.patch(this.api.get('getProductSpecs'), model);
  }

  /**
   * Eliminar especificacion
   *
   * @param {number} id
   * @returns {Observable<{}>}
   * @memberof ParamSpecsService
   */
  public deleteSpecification(id: number): Observable<{}> {
    return this.http.delete(this.api.get('getProductSpecs', [id]), { observe: 'response' });
  }

  /**
   * Servicio apra descargar Specs
   * @param {*} email
   * @returns {Observable<{}>}
   * @memberof ParamSpecsService
   */
  public getDownloadSpecs(email: any): Observable<{}> {
    return this.http.get(this.api.get('exportSpecs', [email]));
  }

  /**
   * Servicio apra descargar categorias
   * @param {*} email
   * @returns {Observable<any>}
   * @memberof ParamSpecsService
   */
  public downloadCategories(param: any): Observable<any> {
    return this.http.post(this.api.get('exporCategories'), param);
  }

}
