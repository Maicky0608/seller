/* 3rd party components */
import { Component, OnInit } from '@angular/core';
/* our own custom components */
import { StoreModel } from '@app/secure/offers/stores/models/store.model';
import { StoresService } from '@app/secure/offers/stores/stores.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '@app/secure/seller/register/register.component';
import { LoadingService, ModalService, Logger, UserLoginService, UserParametersService } from '@app/core';
import { ManageSellerService } from './../manage.service';
import { isEmpty } from 'lodash';
import { RegisterService } from '@app/secure/seller/register/register.service';
import { EventEmitterSeller } from '@app/shared/events/eventEmitter-seller.service';
import { Router } from '@angular/router';
import { RoutesConst } from '@app/shared';
import { MenuModel, updateFunctionality, readFunctionality, administrateName } from '@app/secure/auth/auth.consts';
import { AuthService } from '@app/secure/auth/auth.routing';


import { countries } from '../../register/countries';
import { BasicInformationService } from '@app/secure/products/create-product-unit/basic-information/basic-information.component.service';
import { PayoneerService } from '../../register/payoneer.service';

const log = new Logger('ManageSellerComponent');

/**
 *
 *
 * @export
 * @class ManageSellerComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-manage-seller',
  templateUrl: './manage-seller.component.html',
  styleUrls: ['./manage-seller.component.scss']
})

export class ManageSellerComponent implements OnInit {

  countries = countries;
  colombia = 'COLOMBIA';
  isColombiaSelect = false;

  public imagesRegister: Array<any> = [
    {
      checked: '../../../../../assets/seller-register/logo_exito_check.jpg',
      unchecked: '../../../../../assets/seller-register/logo_exito.jpg'
    },
    {
      checked: '../../../../../assets/seller-register/logo_carulla_check.jpg',
      unchecked: '../../../../../assets/seller-register/logo_carulla.jpg'
    },
    {
      checked: '../../../../../assets/seller-register/logo_mis_catalogos_check.jpg',
      unchecked: '../../../../../assets/seller-register/logo_mis_catalogos.jpg'
    }
  ];

  public emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]?(?:[a-zA-Z0-9-]{0,}[a-zA-Z0-9]+\.)+[a-z]{2,}$/;
  public nameStoreRegex = /^((?!\.com$)(?!\.co$)(?!\.net$)(?!\.net.$)(?!\.gov$)(?! gov$)(?!\.edu$)(?! S.A.S$)(?! S.A$)(?! SA$)(?! SAS$)(?! s.a.s$)(?! sa.s$)(?! s.as$)(?! sas$)(?! s.a.$)(?! S.a.S$)(?! s.a.S$)(?! s.a$)(?! S.a.$)(?! LTDA$)(?! ltda$)(?! Ltda$)(?! LTDA.$)(?! ltda.$)(?! lTDA$)(?! ltDA$)(?! ltdA$)(?! lTda$)(?! ltDa$)(?! lTDa$)(?! LTda$)(?! LtDa$)(?! \s+|\s+$).)*$/;
  public warrantyRegex = /^((?!<script>|<SCRIPT>|<Script>)[\s\S]){1,20000}$/;

  public matcher: MyErrorStateMatcher;
  public validateFormRegister: FormGroup;
  public validateFormRegisterAdmin: FormGroup;

  public nit: FormControl;
  public rut: FormControl;
  public contactName: FormControl;
  public email: FormControl;
  public phoneNumber: FormControl;
  public address: FormControl;
  public state: FormControl;
  public city: FormControl;
  public daneCode: FormControl;
  public idDispatchPort: FormControl;
  public sincoDaneCode: FormControl;
  public name: FormControl;
  public isLogisticsExito: FormControl;
  public isShippingExito: FormControl;
  public isChannelAdvisor: FormControl;
  public gotoExito: FormControl;
  public gotoCarrulla: FormControl;
  public gotoCatalogo: FormControl;
  public profile: FormControl;
  public policy: FormControl;
  profileSeller: string[] = [];
  profileAdmin: string[] = [];
  public showUpdate: boolean;
  departamento = 'departamento';
  activeForm = false;


  public country: FormControl;
  public IdSellerOctopia: FormControl;
  public payoneer: FormControl;


  sellerRegex = {
    phoneNumber: '',
    integerNumber: '',
    contactName: '',
    email: '',
    nameStore: '',
    nit: '',
    rut: '',
    internationalNit: '',
    internationalRut: '',
    internationalPostalCode: '',
    IdSellerOctopia:'',
    payoneer: '',
    internationalState: '',
    internationalCity: '',
    daneCode: '',
    address: '',
    warranty: '',
    onlyLetter: ''
  };



  // variable que almacena el nombre de la tienda seleccionada
  public currentSellerSelect: StoreModel;
  // Información del usuario
  public user: any;

  public activeButton: boolean;
  public existValueInDB: boolean;
  public idState: number;
  public disabledForService: boolean;
  public noValidateData: any;
  public elementStateLoad: string;
  public elementCityLoad: string;
  public elementIdDispatchPortLoad: string;
  public firstEmit = true;
  public idSeller: string;
  public selectedValue: string;
  public initialName: any;
  public initialEmail: any;
  public edit = false;

  public initialNameSeller: any;
  public initialEmailSeller: any;

  // Variables con los permisos que este componente posee
  permissionComponent: MenuModel;
  read = readFunctionality;
  update = updateFunctionality;
  disabledComponent = false;
  department: string;

  // Activar toogle channel advisor
  toggleChannel: Boolean = false;

  /**
   * Creates an instance of ManageSellerComponent.
   * @param {EventEmitterSeller} eventsSeller
   * @param {StoresService} storeService
   * @param {LoadingService} loadingService
   * @param {ManageSellerService} manageSeller
   * @param {ModalService} modalService
   * @param {RegisterService} registerService
   * @memberof ManageSellerComponent
   */
  constructor(
    public eventsSeller: EventEmitterSeller,
    public storeService: StoresService,
    private loadingService: LoadingService,
    private manageSeller: ManageSellerService,
    private modalService: ModalService,
    private registerService: RegisterService,
    public userService: UserLoginService,
    private router: Router,
    public userParams: UserParametersService,
    public authService: AuthService,
    private regexService: BasicInformationService,
    private payoneerService: PayoneerService,
  ) {
    this.matcher = new MyErrorStateMatcher();
    this.currentSellerSelect = new StoreModel(0, '');
    this.user = {};
    this.activeButton = true;
  }


  /**
   * Funcion que verifica si la funcion del modulo posee permisos
   *
   * @param {string} functionality
   * @returns {boolean}
   * @memberof ToolbarComponent
   */
  public getFunctionality(functionality: string): boolean {
    const permission = this.permissionComponent.Functionalities.find(result => functionality === result.NameFunctionality);
    return permission && permission.ShowFunctionality;
  }

  /**
   *
   *
   * @memberof ManageSellerComponent
   */
  ngOnInit() {
    this.permissionComponent = this.authService.getMenu(administrateName);
    this.getProfile();
    this.userService.isAuthenticated(this);
    const disabledForm = !this.getFunctionality(this.update);
    this.disabledComponent = disabledForm;
    this.createFormControls(disabledForm);
    // EventEmitter que permite saber cuando el usuario a buscado una tienda
    this.eventsSeller.eventSearchSeller.subscribe((seller: StoreModel) => {
      this.createForm();
      this.elementStateLoad = null;
      this.elementCityLoad = null;
      this.elementIdDispatchPortLoad = null;
      if (!isEmpty(seller)) {
        this.idSeller = seller.IdSeller;
        this.firstEmit = true;
        this.manageSeller.getSpecificSeller(seller.IdSeller, '1').subscribe((res: any) => {
          if (res.status === 200) {
            this.loadingService.viewSpinner();
            const body = JSON.parse(res.body.body);
            this.currentSellerSelect = body.Data;
            this.validateFormRegister.controls['DaneCode'].markAsUntouched();
            if (this.currentSellerSelect.Country === null || this.currentSellerSelect.Country === undefined) {
              this.country.setValue(this.colombia);
            } else {
              this.country.setValue(this.currentSellerSelect.Country);
            }
            if (this.currentSellerSelect && this.currentSellerSelect.City) {
              this.showUpdate = true;
              // this.currentSellerSelect = body.Data;
              this.nit.setValue(this.currentSellerSelect.Nit);
              this.rut.setValue(this.currentSellerSelect.Rut);
              this.contactName.setValue(this.currentSellerSelect.ContactName);
              this.email.setValue(this.currentSellerSelect.Email);
              this.phoneNumber.setValue(this.currentSellerSelect.PhoneNumber);
              this.state.setValue(this.currentSellerSelect.State);
              this.city.setValue(this.currentSellerSelect.City);
              if (this.currentSellerSelect.IdDispatchPort) {
                this.idDispatchPort.setValue(this.currentSellerSelect.IdDispatchPort);
                this.elementIdDispatchPortLoad = this.currentSellerSelect.IdDispatchPort;
              } else {
                this.idDispatchPort.setValue(0);
              }
              this.address.setValue(this.currentSellerSelect.Address);
              this.daneCode.setValue(this.currentSellerSelect.DaneCode);
              this.sincoDaneCode.setValue(this.currentSellerSelect.SincoDaneCode);
              this.name.setValue(this.currentSellerSelect.Name);
              this.policy.setValue(this.currentSellerSelect.Policy);
              this.isLogisticsExito.setValue(this.currentSellerSelect.IsLogisticsExito);
              this.isShippingExito.setValue(this.currentSellerSelect.IsShippingExito);
              this.isChannelAdvisor.setValue(this.currentSellerSelect.IsChannelAdvisor);
              this.gotoExito.setValue(this.currentSellerSelect.GotoExito);
              this.gotoCarrulla.setValue(this.currentSellerSelect.GotoCarrulla);
              this.gotoCatalogo.setValue(this.currentSellerSelect.GotoCatalogo);
              this.profile.setValue(this.currentSellerSelect.Profile);
              this.selectedValue = this.currentSellerSelect.Profile;
              this.noValidateData = Object.assign({}, {
                email: this.currentSellerSelect.Email,
              });
              this.elementStateLoad = this.currentSellerSelect.State;
              this.elementCityLoad = this.currentSellerSelect.City;
              // this.country.setValue(this.currentSellerSelect.Country);
              this.payoneer.setValue(this.currentSellerSelect.Payoneer);
              this.IdSellerOctopia.setValue(this.currentSellerSelect.IdSellerOctopia);

            } else {
              this.showUpdate = false;
              this.nit.setValue(this.currentSellerSelect.Nit);
              this.email.setValue(this.currentSellerSelect.Email);
              this.name.setValue(this.currentSellerSelect.Name);
              this.profile.setValue(this.currentSellerSelect.Profile);
              this.selectedValue = this.currentSellerSelect.Profile;
              this.noValidateData = Object.assign({}, {
                email: this.currentSellerSelect.Email,
              });
            }
          }
          this.loadingService.closeSpinner();
          this.initialName = this.validateFormRegisterAdmin.value.Name;
          this.initialEmail = this.validateFormRegisterAdmin.value.Email;
          this.initialNameSeller = this.validateFormRegister.value.Name;
          this.initialEmailSeller = this.validateFormRegister.value.Email;
        });
        this.loadingService.closeSpinner();
      }
    });
    this.getRegex();
  }


  /**
   * funcion para consultar la regex en base de datos por modulo
   *
   * @memberof ManageSellerComponent
   */
  getRegex() {
    this.regexService.getRegexInformationBasic(null).subscribe(res => {
      let dataSellerRegex = JSON.parse(res.body.body);
      dataSellerRegex = dataSellerRegex.Data.filter(data => data.Module === 'vendedores');

      for (const val in this.sellerRegex) {
        if (!!val) {
          const element = dataSellerRegex.find(regex => regex.Identifier === val.toString());
          this.sellerRegex[val] = element && `${element.Value}`;
        }
      }
      this.createForm();
      this.createFormControls(this.disabledComponent);
    });
  }


  /**
   *
   *
   * @memberof ManageSellerComponent
   */
  createFormControls(disable: boolean) {
    this.nit = new FormControl({ value: '', disabled: disable }, [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(this.sellerRegex.nit)
    ]);
    this.rut = new FormControl
      ({ value: '', disabled: disable }, [Validators.required,
      Validators.maxLength(20),
      Validators.pattern(this.sellerRegex.rut)
      ]);
    this.contactName = new FormControl
      ({ value: '', disabled: disable }, [Validators.required,
      Validators.pattern(this.sellerRegex.contactName)
      ]);
    this.email = new FormControl
      ({ value: '', disabled: disable }, [Validators.required,
      Validators.pattern(this.sellerRegex.email),
      ]);
    this.phoneNumber = new FormControl
      ({ value: '', disabled: disable }, [Validators.required,
      Validators.pattern(this.sellerRegex.phoneNumber),
      Validators.minLength(7)]);
    this.address = new FormControl
      ({ value: '', disabled: disable }, [Validators.required]);
    this.state = new FormControl({ value: '', disabled: disable }, [Validators.required]);
    this.city = new FormControl({ value: '', disabled: disable });
    this.daneCode = new FormControl({ value: '', disabled: disable });
    this.idDispatchPort = new FormControl({ value: '', disabled: disable }, [Validators.required]);
    this.sincoDaneCode = new FormControl({ value: '', disabled: disable });
    this.name = new FormControl
      ({ value: '', disabled: disable }, [Validators.required,
      Validators.pattern(this.sellerRegex.nameStore)]);
    this.policy = new FormControl({ value: '', disabled: disable },
      [Validators.required, Validators.pattern(this.sellerRegex.warranty)]);
    this.isLogisticsExito = new FormControl({ value: '', disabled: disable });
    this.isShippingExito = new FormControl({ value: '', disabled: disable });
    this.isChannelAdvisor = new FormControl({ value: '', disabled: disable });
    this.gotoExito = new FormControl({ value: '', disabled: disable });
    this.gotoCarrulla = new FormControl({ value: '', disabled: disable });
    this.gotoCatalogo = new FormControl({ value: '', disabled: disable });
    this.profile = new FormControl({ value: '', disabled: disable }, [Validators.required]);

    // disable = true ; Se quita el disable true para prueba internacional
    this.country = new FormControl({ value: '', disabled: disable }, [Validators.required]);
    this.IdSellerOctopia = new FormControl({ value: '', disabled: disable }); 
    this.payoneer = new FormControl({ value: '', disabled: disable });
    this.country.disable();
    this.createForm();
    this.addValidationsSellerForm();
  }

  /**
   *
   *
   * @memberof ManageSellerComponent
   */
  createForm() {

    this.validateFormRegister = new FormGroup({
      Nit: this.nit,
      Rut: this.rut,
      ContactName: this.contactName,
      Email: this.email,
      PhoneNumber: this.phoneNumber,
      Address: this.address,
      State: this.state,
      City: this.city,
      DaneCode: this.daneCode,
      IdDispatchPort: this.idDispatchPort,
      SincoDaneCode: this.sincoDaneCode,
      Name: this.name,
      Policy: this.policy,
      IsLogisticsExito: this.isLogisticsExito,
      IsShippingExito: this.isShippingExito,
      IsChannelAdvisor: this.isChannelAdvisor,
      GotoExito: this.gotoExito,
      GotoCarrulla: this.gotoCarrulla,
      GotoCatalogo: this.gotoCatalogo,
      Profile: this.profile,

      Country: this.country,
      IdSellerOctopia: this.IdSellerOctopia,
      Payoneer: this.payoneer
    });

    this.validateFormRegisterAdmin = new FormGroup({
      Nit: this.nit,
      Email: this.email,
      Name: this.name,
      Profile: this.profile
    });

  }

  /**
   * @method keyPress que permite solo el ingreso de números
   * @param event
   * @memberof ManageSellerComponent
   */
  keyPress(event: any, inputName: string): void {
    if (inputName === 'phoneNumber' && this.isColombiaSelect === true) {
      inputName = 'integerNumber';
    } else {
      inputName = 'phoneNumber';
    }
    const pattern = new RegExp(this.sellerRegex[inputName]);
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /**
   *
   * @method Metodo para validar si existe el parametro despues de cambiar el focus del input
   * @param {*} event
   * @memberof ManageSellerComponent
   */
  validateExist(event: any, param: string): void {
    if (this.initialEmail !== this.validateFormRegisterAdmin.controls.Email.value || this.initialName !== this.validateFormRegisterAdmin.controls.Name.value ||
      this.initialEmailSeller !== this.validateFormRegister.controls.Email.value || this.initialNameSeller !== this.validateFormRegister.controls.Name.value
    ) {
      const jsonExistParam = event.target.value;
      if (jsonExistParam !== '' && jsonExistParam !== '' && jsonExistParam !== undefined && jsonExistParam !== null) {
        this.loadingService.viewSpinner();
        this.activeButton = true;
        this.registerService.fetchData(JSON.parse(JSON.stringify(jsonExistParam.replace(/\ /g, '+'))), param)
          .subscribe(
            (result: any) => {
              if (result.status === 200) {
                const data_response = JSON.parse(result.body.body);
                this.existValueInDB = data_response.Data;
                switch (param) {
                  case 'Email':
                    if (this.existValueInDB && jsonExistParam !== this.noValidateData.email) {
                      this.validateFormRegister.controls[param].setErrors({ 'validExistEmailDB': data_response.Data });
                    }
                    break;
                  case 'Name':
                    if (this.existValueInDB && jsonExistParam !== this.noValidateData.name) {
                      this.validateFormRegister.controls[param].setErrors({ 'validExistNameDB': data_response.Data });
                    }
                    break;
                }
                if (!this.existValueInDB) {
                  this.activeButton = true;

                }
                this.activeButton = true;
                this.loadingService.closeSpinner();
              } else {
                this.modalService.showModal('errorService');
                this.activeButton = true;
                this.loadingService.closeSpinner();
              }
            }
          );
      }
    }
  }

  /**
   * @method receiveDataState Metodo para obtener la data de departamento.
   * @param
   * @memberof ManageSellerComponent
   */
  receiveDataState($event: any): void {
    if ($event && $event !== undefined && $event !== null) {
      this.idState = $event.Id;
      this.validateFormRegister.controls['State'].setValue($event.Name);
      if (!this.firstEmit) {
        if (!this.isColombiaSelect) {
          this.validateFormRegister.controls['City'].setValue('');
          this.validateFormRegister.controls['DaneCode'].setValue(null);
        }
      }
      this.firstEmit = false;
    }
  }

  /**
   * @method receiveDataCitie Metodo para obtener la data de la ciudad.
   * @param
   * @memberof ManageSellerComponent
   */
  receiveDataCitie($event: any): void {
    if ($event && $event !== undefined && $event !== null) {
      this.validateFormRegister.controls['DaneCode'].setValue($event.DaneCode);
      this.validateFormRegister.controls['City'].setValue($event.Name);
      this.validateFormRegister.controls['SincoDaneCode'].setValue($event.SincoDaneCode);
      if (this.activeForm) {
        this.validateFormRegister.controls['DaneCode'].markAsTouched();
      }
      this.activeForm = true;
    }
  }

  /**
   * @method receivePortItem Metodo para obtener la data del puerto seleccionado.
   * @param
   * @memberof ManageSellerComponent
   */
  receivePortItem($event: any) {
    if ($event && $event !== undefined && $event !== null) {
      this.validateFormRegister.controls['IdDispatchPort'].setValue($event.Id);
      this.validateFormRegister.controls['IdDispatchPort'].markAsTouched();
    }
  }

  submitUpdateSeller(): void {

    if (this.validateFormRegister.valid) {
      if (this.validateFormRegister.controls['Country'].value === 'COLOMBIA') {
        this.validateFormRegister.controls['IdDispatchPort'].setValue(null);
      }
      this.loadingService.viewSpinner();
      this.disabledForService = true;
      const profile = `Tienda|${this.validateFormRegister.controls.Profile.value}`;
      const values = this.validateFormRegister.value;
      values.id = this.idSeller;
      values.Name = this.validateFormRegister.controls.Name.value;
      values.City = this.validateFormRegister.controls.City.value;
      values.ContactName = this.validateFormRegister.controls.ContactName.value;
      values.Email = this.validateFormRegister.controls.Email.value;
      values.PhoneNumber = this.validateFormRegister.controls.PhoneNumber.value;
      values.State = this.validateFormRegister.controls.State.value;
      values.Profile = profile;
      values.Policy = this.validateFormRegister.controls.Policy.value;
      values.Country = this.validateFormRegister.controls.Country.value;
      values.IdDispatchPort = this.validateFormRegister.controls.IdDispatchPort.value;
      values.IdSellerOctopia = this.validateFormRegister.controls.IdSellerOctopia.value;

      this.manageSeller.updateSeller(values).subscribe(
        (result: any) => {
          if (result.status === 201 || result.status === 200) {
            const data = JSON.parse(result.body.body);
            if (data.Data) {
              this.modalService.showModal('successUpdate');
            } else if (!data.Data) {
              this.modalService.showModal('error');
            }
          } else {
            this.modalService.showModal('errorService');
          }

          this.disabledForService = false;
          this.loadingService.closeSpinner();

        }
      );
    }
  }


  /**
   * Funcion para enviar registro de administrador editado
   * por: Jose Banguera
   * @memberof ManageSellerComponent
   */
  submitUpdateAdmin(): void {

    if (this.validateFormRegisterAdmin.valid) {
      this.loadingService.viewSpinner();
      this.disabledForService = true;
      const profile = `Exito|${this.validateFormRegisterAdmin.controls.Profile.value}`;
      this.validateFormRegisterAdmin.controls.Profile.setValue(profile);
      const values = this.validateFormRegisterAdmin.value;
      values.id = this.idSeller;
      this.manageSeller.updateSeller(values).subscribe(
        (result: any) => {
          if (result.status === 201 || result.status === 200) {
            const data = JSON.parse(result.body.body);
            if (data.Data) {
              this.modalService.showModal('successUpdate');
            } else if (!data.Data) {
              this.modalService.showModal('error');
            }
          } else {
            this.modalService.showModal('errorService');
          }

          this.disabledForService = false;
          this.loadingService.closeSpinner();

        }
      );
    }
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.getDataUser();
    } else if (!isLoggedIn) {
      this.router.navigate([`/${RoutesConst.home}`]);
    }
  }

  async getDataUser() {
    this.user = await this.userParams.getUserData();
    if (this.user.sellerProfile === 'seller') {
      this.router.navigate([`/${RoutesConst.sellerCenterOrders}`]);
    }
  }

  /**
   * Function to capitalize a string
   * @param value
   */
  public capitalizeName(value: string): string {
    if (!value) {
      return null;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  /**
   * Cargar datos para seleccionar tipo de perfil
   *
   * @memberof ManageSellerComponent
   */
  public getProfile(): void {
    this.registerService.typeProfile()
      .subscribe(
        (result: any) => {
          const datas = JSON.parse(result.body).Data;
          for (const data of datas) {
            if (data.ProfileType === 'Exito') {
              this.profileAdmin = data.Profiles;
            } else if (data.ProfileType === 'Tienda') {
              this.profileSeller = data.Profiles;
            }
          }
        });
  }



  /**
   * funcion para agregar validacion cuando el pais seleccionado es colombia, y cuando es diferente de colombia se aplican otras validaciones
   *
   * @memberof ManageSellerComponent
   */
  addValidationsSellerForm() {
    this.Country.valueChanges.subscribe(val => {
      if (val !== 'null' && val !== null) {
        if (this.colombia === val) {
          this.isColombiaSelect = true;
          this.department = this.currentSellerSelect.State;
          this.departamento = 'Departamento';
        } else {
          this.isColombiaSelect = false;
          this.departamento = 'Región';
        }
        if (this.edit) {
          if (this.colombia === val) {
            this.phoneNumber.setValue(this.currentSellerSelect.PhoneNumber);
            this.daneCode.setValue(this.currentSellerSelect.DaneCode);
          } else {
            this.city.reset({ value: '', disabled: this.isColombiaSelect });
            this.state.reset({ value: '', disabled: false });
            this.PostalCode.reset({ value: '', disabled: false });
            const selectedCountry = this.countries.find(element => element.CountryName === val);
            if (selectedCountry) {
              this.phoneNumber.reset({ value: selectedCountry.CountryIndicative, disabled: false });
            }
          }
        }
        this.edit = true;
        this.isColombiaSelect ? this.validationsForColombiaSelectSellerForm() : this.validationsForNotColombiaSelectSellerForm();
      }

    });
  }

  /**
   * funcion para inicializar el formulario cuando el pais seleccionado es colombia (validaciones especificas)
   *
   * @memberof ManageSellerComponent
   */
  validationsForNotColombiaSelectSellerForm() {
    this.toggleChannel = true;
    this.nit.setValidators(Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern(this.sellerRegex.internationalNit)]));
    this.rut.setValidators(Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern(this.sellerRegex.internationalRut)]));
    this.state.setValidators(Validators.compose([Validators.required, Validators.maxLength(60), Validators.pattern(this.sellerRegex.onlyLetter)]));
    this.city.setValidators(Validators.compose([Validators.required, Validators.maxLength(60), Validators.pattern(this.sellerRegex.onlyLetter)]));
    this.IdDispatchPort.setValidators(Validators.compose([Validators.required]));
    this.PostalCode.setValidators(Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(4), Validators.pattern(this.sellerRegex.internationalPostalCode)]));
    this.payoneer.enable();
    this.IdSellerOctopia.enable();    
    this.payoneer.setValidators(Validators.compose([Validators.maxLength(50), Validators.pattern(this.sellerRegex.payoneer)]));
  }
  /**
   * funcion cuando el pais seleccionado es diferente a colombia (validaciones espedcificas)
   *
   * @memberof ManageSellerComponent
   */
  validationsForColombiaSelectSellerForm() {
    this.toggleChannel = false;
    this.nit.setValidators(Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(this.sellerRegex.nit)]));
    this.rut.setValidators(Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(this.sellerRegex.rut)]));
    this.state.setValidators(null);
    this.city.setValidators(null);
    this.PostalCode.setValidators(Validators.pattern(this.sellerRegex.daneCode));
    this.payoneer.disable();
    this.IdSellerOctopia.disable(); 
  }
  /**
   * dejar seleccionado colombia por defecto
   *
   * @memberof ManageSellerComponent
   */
  putColombiaByDefault() {
    const colombia = this.countries.find(element => element.CountryName === this.colombia);
    // tslint:disable-next-line:curly
    if (!!colombia) this.Country.setValue(colombia.CountryName);
    this.Country.disable();
  }
  /**
   * funcion para validar el payoneer user cuando el usuario lo ha cambiado
   *
   * @param {*} event
   * @memberof ManageSellerComponent
   */
  validateExitPayoneerUser(event: any) {
    this.loadingService.viewSpinner();
    const value = event.target.value;
    if (!!value) {
      this.payoneerService.getStatusById(value).subscribe((val: any) => {
        const body = JSON.parse(val.body);
        if (body && !body.Data) {
          this.Payoneer.setErrors({ payoneer: true });
        }
        this.loadingService.closeSpinner();
      });
    }
    this.loadingService.closeSpinner();
  }
  get Country(): FormControl {
    return this.validateFormRegister.get('Country') as FormControl;
  }
  get State(): FormControl {
    return this.validateFormRegister.get('State') as FormControl;
  }
  get City(): FormControl {
    return this.validateFormRegister.get('City') as FormControl;
  }
  get PostalCode(): FormControl {
    return this.validateFormRegister.get('DaneCode') as FormControl;
  }
  get IdDispatchPort(): FormControl {
    return this.validateFormRegister.get('IdDispatchPort') as FormControl;
  }
  get Payoneer(): FormControl {
    return this.validateFormRegister.get('Payoneer') as FormControl;
  }
 
  
}
