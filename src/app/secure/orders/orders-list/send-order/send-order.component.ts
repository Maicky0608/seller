import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Logger, UserParametersService, LoadingService } from '@app/core';
import { Carries, ComponentsService, Const, FAKE, Order, ProductsEntity, UserInformation, RoutesConst } from '@app/shared';
import * as _ from 'lodash';

import { OrderService } from '../orders.service';
import { Router } from '@angular/router';
import { MyProfileService } from '@app/secure/aws-cognito/profile/myprofile.service';
import { TranslateService } from '@ngx-translate/core';

// log component
const log = new Logger('SendOrderComponent');

/**
 * Component que se emplea para realizar el envío de los productos de una orden. se despliega un modal donde se
 * puede ingresar la guía y transportadora de un producto o de todos los productos. para ingresar la guía y
 * transportadora de un producto se emplea el componente "FormProductComponent" el cual permite agregar la
 * logica separada a cada uno de los productos para realizar su respectivo envío individual
 */
@Component({
  selector: 'app-send-order',
  templateUrl: './send-order.component.html',
  styleUrls: ['./send-order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

/**
 * Componente
 */
export class SendOrderComponent implements OnInit {

  // User information
  public user: UserInformation;
  public allUser: any;
  public isInternational= false;

  // Información de la orden
  public order: Order;
  // Formulario para realizar el envio de toda la orden
  public sendAllForm: FormGroup;
  // Lista de transportadoras.
  public Carries: Array<Carries> = [];
  public CarriesInternational: Array<Carries> = [];
  public CarriesNational: Array<Carries> = [];
  public idState = 170;

  // Boolean que permite saber si se han editado productos de la orden
  public productIsUpdating = false;

  /**
   * Creates an instance of SendOrderComponent.
   * @param {MatDialogRef<SendOrderComponent>} dialogRef
   * @param {OrderService} orderService
   * @param {ComponentsService} componentService
   * @param {FormBuilder} fb
   * @param {*} data
   * @memberof SendOrderComponent
   */
  constructor(public dialogRef: MatDialogRef<SendOrderComponent>,
    public orderService: OrderService,
    public componentService: ComponentsService,
    private fb: FormBuilder,
    public userParams: UserParametersService,
    private loadingService: LoadingService,
    private languageService: TranslateService,
    public router: Router,
    private profileService: MyProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // _.cloneDeep permite clonar el json y no generar error de binding en la vista orders-list,
    // ya que al usar el mimso json estaba presentando cambios en ambas vistas
    this.order = _.cloneDeep(data.order);
    this.user = data.user;
    this.order = this.order || FAKE.FAKEORDER;
    this.order.products = this.order.products.filter(x => x.idStatusProduct === 35);
  }

  /**
   * Funcionalidad para cerrar el modal actual de envio
   * @memberof SendOrderComponent
   */
  onNoClick(): void {
    if (this.productIsUpdating) {
      this.dialogRef.close(this.order);
    } else {
      this.dialogRef.close(false);
    }
  }

  /**
   * ngOnInit
   * @memberof SendOrderComponent
   */
  ngOnInit() {
    this.getDataUser();
    this.getAllDataUser();
    // Si solo hay un registro de producto para ingresar tracking y guía, y la opción enviar
    // todo esta seleccionada, paso a false la opción de envío de todos los productos
    if (this.getLengthProductForSend() === 1) {
      if (this.order.sendAllProduct === true) {
        this.order.sendAllProduct = false;
      }
    }
    // obtengo la lista  de transportadores
    // creo el formulario de envío
    this.createForm();
  }

  async getDataUser() {
    this.user = await this.userParams.getUserData();
  }

  /**
   * Metodo apra traer toda la informacion de quien esta logueado.
   *
   * @memberof SendOrderComponent
   */
  async getAllDataUser() {
    this.loadingService.viewSpinner();
    const sellerData = await this.profileService.getUser().toPromise().then(res => {
      const body: any = res.body;
      const response = JSON.parse(body.body);
      const userData = response.Data;
      this.allUser = userData;
      this.loadingService.closeSpinner();
      return userData;
    });
    if (sellerData && sellerData.Country !== 'COLOMBIA') {
      this.isInternational = true;
    } else {
      this.isInternational = false;
    }
    this.loadingService.closeSpinner();
    this.getCarries();
  }

  /**
   * Creación del formulario de envío
   * @memberof SendOrderComponent
   */
  createForm() {
    // estado por defecto para los inputs de envio de todos los productos.
    let stateInput = true;
    // si el envio de todos los productos esta seleccionado, no desactivo los inputs de envio de todos los productos.
    if (this.order.sendAllProduct === true) {
      stateInput = false;
    }
    // armo la estructura para la validación de los inputs de envío de todos los productos.
    this.sendAllForm = this.fb.group({
      'Transporter': [{ value: '', disabled: stateInput }, Validators.required],
      // tslint:disable-next-line:max-line-length
      'Guide': [{ value: '', disabled: false }, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
    });
  }

  /**
   * Funcionalidad para validar los check asociados a un productos.
   * @param {any} item
   * @memberof SendOrderComponent
   */
  validateCheckProductForSendAll(item: any) {
    for (let j = 0; j < this.order.products.length; j++) {
      // si un elemento check esta en false, desactivo el boton enviar todo.
      if (this.order.products[j].checkProductToSend === false) {
        this.order.sendAllProduct = false;
        this.sendAllForm.disable();
      }
    }
    // Luego de validar el estado false de los check, paso a validar el estado true para ver si el boton se puede activar o no.
    this.validateAllCheckProducts(item);
  }

  /**
   * Funcionalidad para validar si todos los checks de un prodcutos estan seleccionados
   * @param {any} item
   * @memberof SendOrderComponent
   */
  validateAllCheckProducts(item: any) {
    // si la variable isAllChecked no cambia a false, es por que se puede activar el boton enviar todo.
    let isAllChecked = true;

    for (let j = 0; j < item.products.length; j++) {
      if (item.products[j].checkProductToSend !== true) {
        isAllChecked = false;
      }
    }
    // si todos los check estan seleccionados, activo el boton enviar todo.
    if (isAllChecked) {
      this.order.sendAllProduct = true;
      this.sendAllForm.enable();
    } else {
      for (let j = 0; j < item.products.length; j++) {
        item.products[j].checkProductToSend = false;
      }
    }
  }

  /**
   * Funcionalidad para seleccionar todos los productos de una orden
   * @param {any} item
   * @memberof SendOrderComponent
   */
  checkAllProductInOrder(item: any) {
    if (this.order.sendAllProduct === true) {
      this.order.sendAllProduct = false;
      this.sendAllForm.disable();
      for (let j = 0; j < this.order.products.length; j++) {
        this.order.products[j].checkProductToSend = false;
      }
    } else {
      this.order.sendAllProduct = true;
      this.sendAllForm.enable();
      for (let j = 0; j < this.order.products.length; j++) {
        this.order.products[j].checkProductToSend = true;
      }
    }
  }

  /**
   * Funcionalidad para realizar el envío de todos los productos
   * @param {any} order
   * @memberof SendOrderComponent
   */
  sendAllProductsOrder(order: any) {
    const productList = [];
    for (let index = 0; index < order.products.length; index++) {
      productList.push(order.products[index].id);
    }
    if (this.isInternational) {
      this.idState = 35;
    } else {
      this.idState = Const.OrderEnProcesoDeEnvio;
    }
    const jsonOrder = {
      tracking: this.sendAllForm.value.Guide,
      carrier: this.sendAllForm.value.Transporter,
      shipDate: new Date(),
      idState: this.idState,
      idSeller: this.user.sellerId,
      products: productList
    };
    this.orderService.sendAllProductInOrder(jsonOrder, this.order.id).subscribe((res: any) => {
      if (res.errors !== 0) {
        this.componentService.openSnackBar(this.languageService.instant('secure.orders.send.error_ocurred_processing'), this.languageService.instant('actions.close'), 15000);
      } else {
        this.componentService.openSnackBar(this.languageService.instant('secure.orders.send.send_correctly'), this.languageService.instant('actions.close'), 15000);
        for (let i = 0; i < this.order.products.length; i++) {
          if (this.order.products[i].tracking == null) {
            this.order.products[i].tracking = this.sendAllForm.value.Guide;
            this.order.products[i].carrier = this.sendAllForm.value.Transporter;
            // Actualizo el estado del producto local.
            this.order.products[i].idStatusProduct = Const.ProductEnProcesoDeEnvio;
            this.order.products[i].statusProduct = Const.NameProductEnProcesoDeEnvio;
            // Indico que se realizaron cambios en uno o mas productos. para que al cerrar el modal se actualice la lista de productos.
            this.productIsUpdating = true;
          }
        }
        // Si la orden ya no posee mas productos para ser editados. paso a actualizar el estado de la orden
        if (this.getLengthProductForSend() === 0) {
          this.order.idStatusOrder = Const.OrderEnProcesoDeEnvio;
          this.order.statusOrder = Const.NameOrderEnProcesoDeEnvio;
        }
        // retorno la orden para que se actualice la información
        this.dialogRef.close(this.order);
        window.location.reload();
      }
      this.onNoClick();
    }, error => {
      log.info(error);
    });
  }

  /**
   * Método que retorna el número de elementos a ser enviados en una orden
   * @returns
   * @memberof SendOrderComponent
   */
  getLengthProductForSend() {
    let numberElements = 0;
    for (let i = 0; i < this.order.products.length; i++) {
      if (this.order.products[i].tracking == null) {
        numberElements += 1;
      }
    }
    return numberElements;
  }

  /**
   * Metodo para obtener la lista de transportadoras.
   * @memberof SendOrderComponent
   */
  getCarries() {
    this.loadingService.viewSpinner();
    this.orderService.getCarries().subscribe((res: any) => {
      res.forEach(el => {
        if (this.allUser.Country && this.allUser.Country !== 'COLOMBIA') {
          if (el.name === 'INTERNATIONAL SHIPPING') {
            this.CarriesInternational.push(el);
            this.Carries = this.CarriesInternational;
          }
        } else {
          if (el.name !== 'INTERNATIONAL SHIPPING') {
            this.CarriesInternational.push(el);
            this.Carries = this.CarriesInternational;
          }
        }
      });
      this.loadingService.closeSpinner();
    });
    this.loadingService.closeSpinner();
  }

  /**
   * Metodo que escucha los cambios en un producto y permite actualizar el json de los productos actuales
   * @param {any} product
   * @memberof SendOrderComponent
   */
  updateTrackingAndCarrierForProduct(product: ProductsEntity) {
    // encuentro el objeto de la orden en el array
    const currentProduct = this.order.products.find(x => x.id === product.id);
    // obtengo el index donde se encuentra el objeto
    const index = this.order.products.indexOf(currentProduct);
    // edito el valor del la variable processedOrder al valor mandado al servidor
    this.order.products[index].tracking = product.tracking;
    this.order.products[index].carrier = product.carrier;

    // Actualizo el estado del producto local.
    this.order.products[index].idStatusProduct = Const.ProductEnProcesoDeEnvio;
    this.order.products[index].statusProduct = Const.NameProductEnProcesoDeEnvio;


    // Si la orden ya no posee mas productos para ser editados. paso a actualizar el estado de la orden
    if (this.getLengthProductForSend() === 0) {
      this.order.idStatusOrder = Const.OrderEnProcesoDeEnvio;
      this.order.statusOrder = Const.NameOrderEnProcesoDeEnvio;
    }

    // Indico que se realizaron cambios en uno o mas productos. para que al cerrar el modal se actualice la lista de productos.
    this.productIsUpdating = true;
  }
}
