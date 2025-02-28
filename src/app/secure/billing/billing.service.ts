import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from '@app/core';
import { Billing } from '@app/shared';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';


const respuesta = {
  data: {
    count: 45,
    paginationToken: '{}',
    paginationTokens: [],
    viewModel: [
      { id: '637086675180158443', orderNumber: '1' },
      { id: '637058000530130075', orderNumber: '2' },
      { id: '637086494941759601', orderNumber: '3' },
      { id: '637130518760349731', orderNumber: '4' },
      { id: '637274208780966057', orderNumber: '5' },
      { id: '637058000520968788', orderNumber: '6' },
      { id: '637122970660242786', orderNumber: '7' },
      { id: '637281041614556441', orderNumber: '8' },
      { id: '637133443640064226', orderNumber: '9' }
    ]
  },
  errors: [],
  message: '',
  pendingResponse: false,

}

@Injectable()
export class BillingService {

  // Variable para almacenar la fecha de inicio del filtro
  public dateInitial: string;

  // Variable para almacenar la fecha de fin del filtro
  public dateFinal: string;

  // Variable para almacenar el bill del filtro
  public bill: string;

  // Variable del id del vendedor
  public sellerId;

  // Variable del id del vendedor
  public sellerName;

  constructor(
    private http: HttpClient,
    private api: EndpointService,
    private datePipe: DatePipe
  ) { }

  /**
   * Método para realiar la consulta de las transportadoras.
   *
   * @param {any} stringSearch
   * @returns {Observable<Billing[]>}
   * @memberof BillingService
   */
  getBilling(stringSearch: any): Observable<Billing[]> {
    return new Observable(observer => {
      // Id del vendedor.

      this.http.get(this.api.get('getBilling', [stringSearch])).subscribe((data: any) => {
        observer.next(data);
      }, error => {
        observer.error(error);
      });
    });
  }

  /**
   * Método para realiar la consulta de las órdenes de acuerdo a los filtros indicados.
   *
   * @param {User} user
   * @param {any} limit
   * @param {any} stringSearch
   * @returns {Observable<Billing[]>}
   * @memberof BillingService
   */
  getOrdersBillingFilter(user: any, limit: any, stringSearch: any): Observable<Billing[]> {
    return new Observable(observer => {
      // Id del vendedor.
      this.sellerId = user.sellerId;
      this.sellerName = user.sellerName;

      this.http.get<Billing[]>(this.api.get('searchBilling', [this.sellerId, limit + stringSearch])).subscribe((data) => {
        observer.next(data);
      }, errorMessage => {
        observer.error(errorMessage);
      });
    });
  }


  /**
   * Método para obtener el filtro actual que el usuario ha aplicado a la consulta de órdenes.
   *
   * @returns
   * @memberof BillingService
   */
  getCurrentFilterOrders() {
    const currentFilter = JSON.parse(localStorage.getItem('currentFilter'));
    return currentFilter || {};
  }

  /**
   * Metodo para setear el filtro actual que el usuario ha aplicado a las órdenes que esta visualizando.
   *
   * @param {any} data
   * @memberof BillingService
   */
  setCurrentFilterOrders(data: any) {
    localStorage.setItem('currentFilter', JSON.stringify(data));
  }

  /**
   * @method getCurrentFilterPays
   * @description Método para obtener el filtro actual que el usuario ha aplicado a la consulta de pagos
   * @memberof DownloadBillingPayService
   */
  getCurrentFilterPay() {
    const currentFilterBillingPay = JSON.parse(localStorage.getItem('currentFilterBillingPay'));
    return currentFilterBillingPay || {};
  }

  /**
   * @method setCurrentFilterBillingPay
   * @description Metodo para setear el filtro actual que el usuario ha aplicado a las órdenes que esta visualizando
   * @param dateInitial
   * @param dateFinal
   * @param bill
   * @memberof DownloadBillingPayService
   */
  setCurrentBillingPay(dateInitial: string, dateFinal: string, bill: string) {
    const objParamsFilter = {
      dateInitial,
      dateFinal,
      bill
    };
    localStorage.setItem('currentFilterBillingPay', JSON.stringify(objParamsFilter));
  }

  downloadBillingPay(params: any): Observable<[{}]> {
    return new Observable(observer => {
      this.http.post<any>(this.api.get('exportBillingPays'), params)
        .subscribe((data: any) => {
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }

  getAllSummaryPayment(params: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(this.api.get('getListAllSummaryBilling'), params)
        .subscribe((data: any) => {
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });

  }

}
