import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from '@app/core';
import { Observable } from 'rxjs';


@Injectable()

/**
 * Clase LoadGuideService
 */
export class LoadGuideService {

  constructor(
    private http: HttpClient,
    private api: EndpointService
  ) { }

  /**
   * Método para realiar la consulta de las transportadoras
   * @param user
   * @param {any} guide
   * @returns {Observable<[{}]>}
   * @memberof LoadGuideService
   */
  sendAllGuides(user: any, guide: any): Observable<any> {
    return new Observable(observer => {
      this.http.patch(this.api.get('sendAllGuides'), guide).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err);
      });
    });
  }

  /**
   * Método para decargar la información para el formato de guía
   * @param {User} user
   * @param {any} stringUrl
   * @returns {Observable<[{}]>}
   * @memberof LoadGuideService
   */
  downloadInformationForGuide(user: any, stringUrl): Observable<[{}]> {
    return new Observable(observer => {
      this.http.get(this.api.get('getallordersbysellerwithouttracking', [stringUrl]),
      ).subscribe((data: any) => {
        observer.next(data);
      }, error => {
        observer.error(error);
      });
    });
  }
  /**
   * funcion para validar el estado de la carga de guias
   *
   * @returns {Observable<any>}
   * @memberof LoadGuideService
   */
  validateStatusLoadGuide(): Observable<any> {
    return new Observable(observer => {
      this.http.get(this.api.get('validateStatusLoadGuide'),
      ).subscribe((data: any) => {
        observer.next({'body': data});
      }, error => {
        observer.error(error);
      });
    });
  }
}
