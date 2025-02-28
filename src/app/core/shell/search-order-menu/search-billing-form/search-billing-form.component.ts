import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ComponentsService, SearchFormEntity } from '@app/shared';
import { ShellComponent } from '@core/shell/shell.component';
import { BillingService } from '@secure/billing/billing.service';
import { isEmpty } from 'lodash';
import { UserParametersService } from '@app/core/aws-cognito/user-parameters.service';
import { LoadingService } from '@app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-billing-form',
  templateUrl: './search-billing-form.component.html',
  styleUrls: ['./search-billing-form.component.scss']
})

export class SearchBillingFormComponent implements OnInit {

  // Formulario para realizar la busqueda
  public myform: FormGroup;
  // user info
  public user: any;
  // Configuración para el formato de fecha
  public locale = 'es-CO';
  // Variable que almacena los datos que se le pueden pasar al formulario
  @Input() informationToForm: SearchFormEntity;


  constructor(
    public componentsService: ComponentsService,
    private billingService: BillingService,
    private shellComponent: ShellComponent,
    private fb: FormBuilder,
    private userParams: UserParametersService,
    private languageService: TranslateService,
    private loadingService?: LoadingService
  ) {
  }

  /**
   * ngOnInit
   * @memberof SearchOrderFormComponent
   */
  ngOnInit() {
    // Obtengo la información del usuario
    this.getDataUser();
    this.createForm();
  }

  async getDataUser() {
    this.user = await this.userParams.getUserData();
  }

  /**
   * Método para crear el formulario.
   *
   * @memberof SearchOrderFormComponent
   */
  createForm() {
    // Estructura para los datos del formulario de consulta.
    this.myform = this.fb.group({
      'paymentDateInitial': [null, Validators.compose([])],
      'paymentDateFinal': [null, Validators.compose([])],
      'billingNumber': [null, Validators.compose([Validators.minLength(1)])],
    });
  }

  /**
   * Método para limpiar el formulario.
   *
   * @memberof SearchOrderFormComponent
   */
  clearForm() {
    this.myform.reset();
    this.getAllPayOrders();
  }

  /**
   * Método para desplegar el menú.
   *
   * @memberof SearchOrderFormComponent
   */
  toggleMenu() {
    this.shellComponent.sidenavSearchOrder.toggle();
  }

  /**
   * Método para obtener las órdenes.
   *
   * @param {any} state
   * @memberof SearchOrderFormComponent
   */
  getOrderList(state: any) {
    this.shellComponent.eventEmitterOrders.getOrderList(state);
  }

  /**
   * Método para filtrar las órdenes.
   *
   * @param {any} data
   * @memberof SearchOrderFormComponent
   */
  filterOrder(data: any) {
    const datePipe = new DatePipe(this.locale);

    // Formatear la fechas.
    const paymentDateInitial = datePipe.transform(data.paymentDateInitial, 'yyyy/MM/dd');
    const paymentDateFinal = datePipe.transform(data.paymentDateFinal, 'yyyy/MM/dd');

    // String que indicara los parametros de la consulta.
    let stringSearch = '';
    const objectSearch: any = {};

    if (!isEmpty(paymentDateInitial) && !isEmpty(paymentDateFinal)) {
      // paymentDateInitial
      stringSearch += `&paymentDateInitial=${paymentDateInitial}`;
      objectSearch.paymentDateInitial = paymentDateInitial;
      // paymentDateFinal
      stringSearch += `&paymentDateFinal=${paymentDateFinal}`;
      objectSearch.paymentDateFinal = paymentDateFinal;
    }

    if (!isEmpty(data.billingNumber)) {
      stringSearch += `&billingNumber=${data.billingNumber}`;
      objectSearch.billingNumber = data.billingNumber;
    }

    if (!isEmpty(stringSearch)) {
      // Guardar filtro aplicado por el usuario.
      this.billingService.setCurrentFilterOrders(objectSearch);
      this.billingService.setCurrentBillingPay(objectSearch.paymentDateInitial, objectSearch.paymentDateFinal, objectSearch.billingNumber);
      // Obtener las órdenes con el filtro indicado.
      this.loadingService.viewSpinner();
      this.billingService.getOrdersBillingFilter(this.user, 100, stringSearch).subscribe((res) => {
        this.loadingService.closeSpinner();
        if (res) {
          // Indicar los elementos que esten suscriptos al evento.
          this.shellComponent.eventEmitterOrders.filterBillingListResponse(res);
          this.toggleMenu();
        } else {
          this.componentsService.openSnackBar(this.languageService.instant('secure.billing.no_payment'), this.languageService.instant('actions.close'), 3000);
        }
      }, err => {
        this.componentsService.openSnackBar(this.languageService.instant('errors.error_check_payment'), this.languageService.instant('actions.close'), 3000);
      });
    } else {
      this.componentsService.openSnackBar(this.languageService.instant('errors.error_no_searh_criteria'), this.languageService.instant('actions.close'), 3000);
    }
  }

  getAllPayOrders() {
    this.loadingService.viewSpinner();
    this.billingService.getOrdersBillingFilter(this.user, 100, '').subscribe(res => {
      if (res) {
        // Indicar los elementos que esten suscriptos al evento.
        this.shellComponent.eventEmitterOrders.filterBillingListResponse(res);
        this.toggleMenu();
      }
      this.loadingService.closeSpinner();
    });
  }
}
