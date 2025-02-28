import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInCallback, UserLoginService, LoadingService, ModalService } from '@app/core';
import { RoutesConst } from '@app/shared';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { StoresService } from '@app/secure/offers/stores/stores.service';
import { ErrorStateMatcher, MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { DialogWithFormComponent } from '@app/shared/components/dialog-with-form/dialog-with-form.component';
import { MyProfileService } from './myprofile.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateService } from '@app/shared/util/date.service';
import { MenuModel, vacationFunctionality, cancelVacacionFunctionality } from '@app/secure/auth/auth.consts';
import { AuthService } from '@app/secure/auth/auth.routing';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ModalContactPerfilComponent } from './modal-contact-perfil/modal-contact-perfil.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-awscognito',
    templateUrl: './myprofile.html',
    styleUrls: ['myprofile.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
            state('*', style({ height: '*', visibility: 'visible' })),
            transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class MyProfileComponent implements LoggedInCallback, OnInit {

    profile = 'Perfil';
    public parameters: Array<Parameters> = [];
    public cognitoId: String;
    public user: any;
    form: FormGroup;
    isInVacation: boolean;
    isAdmin: boolean;
    vacationForm: FormGroup;
    today = DateService.getToday();
    role: string;
    @ViewChild('dialogTemplate', { static: false }) content: TemplateRef<any>;
    @ViewChild('intialPicker', { static: false }) initialPicker;
    @ViewChild('endPicker', { static: false }) endPicker;
    dataSource: MatTableDataSource<any>;

    // Permisos
    vacation = vacationFunctionality;
    cancelVacation = cancelVacacionFunctionality;
    canVacation: boolean;
    canCancelVacation: boolean;
    enableEndVacation: boolean;
    permissionComponent: MenuModel;
    endvacationStart: any;
    tomorrow = DateService.getTomorrowDate();

    otherUser: any;
    userData: any;
    isDisable: boolean;
    clickBoarToken = false;
    public dialogRef: any;
    public arrayListArea = [];
    public idSeller = null;
    public tokenChannel = null;
    public showLoading = true;

    // Seller nacional o internacional
    isChannel: Boolean = false;
    channelAdvisor: any;
    typeUser = null;
    userInformation = {
        name: null,
        id: null,
        nit: null,
        storeName: null,
        email: null
    };

    displayedColumns = [
        'responsibleArea',
        'name',
        'position',
        'email',
        'phone',
        'telephone',
        'action',
    ];



    constructor(
        public router: Router,
        public userService: UserLoginService,
        private fb: FormBuilder,
        private sotreService: StoresService,
        private dialog: MatDialog,
        private loading: LoadingService,
        private modalService: ModalService,
        private profileService: MyProfileService,
        public authService: AuthService,
        private snackBar: MatSnackBar,
        private languageService: TranslateService,) {
        this.loading.viewSpinner();
    }

    ngOnInit() {
        this.getAllDataUser();
        this.enableEndVacation = true;
        this.initUserForm();
        this.initVacationForm();
        this.userService.isAuthenticated(this);
        this.changeLanguaje();
    }
    /**
     * funcion para consultar todos los contactos que esta registrados
     *
     * @memberof MyProfileComponent
     */
    getAllContactData() {
        this.profileService.getAllContactData().subscribe(result => {
            if (result.status === 200) {
                this.showLoading = false;
                const body = JSON.parse(result.body.body);
                this.dataSource = new MatTableDataSource(body.Data);
                body.Data.forEach(element => {
                    this.arrayListArea.push(
                        {
                            NameList: element.NameList,
                            Traduction: element.Traduction
                        }
                    );
                });
            } else {
                console.error('Error al momento de traer todos los contactos');
            }
        });
    }
    /**
     * funcion para abrir el modal de contactos
     *
     * @param {*} contact
     * @memberof MyProfileComponent
     */
    openModalContact(contact: any) {
        this.dialogRef = this.dialog.open(ModalContactPerfilComponent, {
            width: '50%',
            data: {
                contact: contact,
                arrayListArea: this.arrayListArea,
                idSeller: this.idSeller
            },
            disableClose: false,
        });

        const dialogIntance = this.dialogRef.componentInstance;
        this.dialogRef.afterClosed().subscribe(res => {
            this.arrayListArea = [];
            this.getAllContactData();
        });
        dialogIntance.processFinishModalContactProfiel$.subscribe((val) => {
            this.arrayListArea = [];
            this.getAllContactData();
        });
    }



    /**
     * Metodo que obtiene la información completa del usuario.
     * @memberof MyProfileComponent
     */
    async getAllDataUser() {
        this.loading.viewSpinner();
        const sellerData = await this.profileService.getUser().toPromise().then(res => {
            const body: any = res.body;
            const userData = JSON.parse(body.body).Data;
            this.tokenChannel = userData.TokenChannel;
            this.typeUser = userData.Profile;
            this.idSeller = userData.IdSeller;
            if (userData.Profile === 'seller') {
                this.getAllContactData();
            }
            if (userData.Status && userData.Status === 'Disable') {
                this.isDisable = true;
            } else {
                this.isDisable = false;
            }
            this.loading.closeSpinner();
        });
    }
    /**
     * funcion para consultar los permisos
     *
     * @memberof MyProfileComponent
     */
    getPermissions() {
        this.authService.availableModules$.pipe(distinctUntilChanged()).subscribe(data => {
            if (!!data) {
                const modules = data.find(mod => mod.Name === this.profile);
                // tslint:disable-next-line: no-shadowed-variable
                const menu = modules && modules.Menus.find(menu => menu.Name === this.profile);
                const actions = menu && menu.Actions;
                this.canVacation = actions && !!(actions.find(action => action === this.vacation));
                this.canCancelVacation = actions && !!(actions.find(action => action === this.cancelVacation));
            }
        });
    }

    /**
     * Formulario para la información del usuario
     */
    private initUserForm() {
        this.form = this.fb.group({
            Nit: [''],
            Email: [''],
            IdSeller: [''],
            Name: [''],
        });
    }

    /**
     * Metodo que abre el datepicker al cual se le da click
     * @param pos Posición del datePicker a abrir;
     */
    openPicker(pos: number) {
        switch (pos) {
            case 1:
                this.initialPicker.open();
                break;
            case 2:
                this.endPicker.open();
                break;
        }
    }

    /**
     * Genera el formulario para programar vacaciones
     */
    private initVacationForm() {
        this.vacationForm = this.fb.group({
            StartDateVacation: ['', Validators.compose([Validators.required])],
            EndDateVacation: ['', Validators.compose([Validators.required])]
        });
        this.startDateVacation.valueChanges.subscribe(val => {
            // tslint:disable-next-line:no-unused-expression
            !!val && this.endDateVacation.reset(null);
        });
    }

    /**
     * Metodo que orquesta la creación del dialogo de programar vacaciones
     */
    sendToOpenVacationDialog() {
        const data = this.setDataVacationsDialog();
        const dialogInstance = this.openDialogVacation(data);
        this.setConfigVacationDialog(dialogInstance);
    }

    /**
     * Metodo que setea la configuración del dialogo
     */
    setConfigVacationDialog(dialogInstance: DialogWithFormComponent) {
        dialogInstance.content = this.content;
        dialogInstance.confirmation = () => {
            const vacationForm = this.vacationForm.value;
            if (vacationForm.StartDateVacation && vacationForm.EndDateVacation) {
                vacationForm.StartDateVacation = DateService.getDateFormatToRequest(vacationForm.StartDateVacation);
                vacationForm.EndDateVacation = DateService.getDateFormatToRequest(vacationForm.EndDateVacation);
            }
            this.loading.viewSpinner();
            this.sotreService.changeStateSeller(vacationForm).subscribe(response => {
                const body = response.body;
                if (body && body.statusCode && body.statusCode === 201) {
                    const resultData = JSON.parse(body.body);
                    if (resultData && resultData.Message && resultData.Message === 'El usuario ha sido actualizado éxitosamente.') {
                        this.user.StartVacations = DateService.getDateFormatToShow(this.startDateVacation.value);
                        this.user.EndVacations = DateService.getDateFormatToShow(this.endDateVacation.value);
                        this.isInVacation = true;
                    } else {
                        this.profileService.getUser().toPromise().then(res => {
                            // tslint:disable-next-line:no-shadowed-variable
                            const body: any = res.body;
                            // tslint:disable-next-line:no-shadowed-variable
                            const response = JSON.parse(body.body);
                            const userData = response.Data;
                            this.setUserData(userData);
                        });
                    }
                } else {
                    this.modalService.showModal('errorService');
                }
                dialogInstance.onNoClick();
                this.loading.closeSpinner();
            });
        };
    }

    /**
     * Metodo que abre el dialogo de vacaciones
     * @param data Data del dialogo
     */
    openDialogVacation(data: any) {
        const dialogRef = this.dialog.open(DialogWithFormComponent, {
            data: data,
            width: '55%',
            minWidth: '280px'
        });
        return dialogRef.componentInstance;
    }

    /* metodo para habilitar la fecha final y setear un dia despues de seleccionado las vacaciones */

    startDate() {
        this.enableEndVacation = false;
        // tslint:disable-next-line:prefer-const
        let date = moment(this.vacationForm.controls.StartDateVacation.value).add(1, 'days').utc();
        this.endvacationStart = date['_d'];
    }

    /**
     * Metodo que retorna la data del dialogo de programar vacaciones
     */
    setDataVacationsDialog() {
        const title = this.languageService.instant('secure.seller.list.vacation_title_modal');
        const message = this.languageService.instant('secure.seller.list.vacation_message_modal');
        const icon = 'local_airport';
        const form = this.vacationForm;
        const showButtons = true;
        const btnConfirmationText = null;
        return { title, message, icon, form, showButtons, btnConfirmationText };
    }

    /**
     *  Metodo que verifica si el usuario esta logeado o no, de estar logeado, obtiene la información del usuario
     * @param message
     * @param isLoggedIn
     */
    async isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate([`/${RoutesConst.homeLogin}`]);
        } else {
            const user = await this.profileService.getUser().toPromise().then(res => {
                const body: any = res.body;
                const response = JSON.parse(body.body);
                const userData = response.Data;
                return userData;
            });
            this.setUserData(user);
        }
    }

    /**
     * Metodo que mapea la información de un usuario
     * @param user información del usuario
     */
    setUserData(user: any) {
        this.userInformation = {
            name: user.Name,
            id: user.IdSeller,
            nit: user.Nit,
            storeName: null,
            email: user.Email
        };
        const startDate = new Date(user.StartVacations);
        const endDate = new Date(user.EndVacations);
        if (startDate.getFullYear() === 1 || endDate.getFullYear() === 1) {
            user.StartVacations = null;
            user.EndVacations = null;
        }
        this.user = Object.assign({}, user);
        this.isAdmin = !this.user.City;
        this.isInVacation = (!!this.user.StartVacations && !!this.user.EndVacations);
        if (this.isInVacation) {
            this.setVacationForm();
            this.user.StartVacations = DateService.getDateFormatToShow(new Date(this.user.StartVacations));
            this.user.EndVacations = DateService.getDateFormatToShow(new Date(this.user.EndVacations));
        }
        this.setUserForm(this.user);
    }

    /**
     * Metodo que actualiza la información de las vacaciones programadas para reProgramar las vacaciones
     */
    setVacationForm() {
        const endDate = DateService.getDateFormatToShow(this.user.EndVacations);
        const startDateVacationsSeller = DateService.stringToDate(DateService.getDateFormatToShow(this.user.StartVacations));
        if (moment(this.today).diff(moment(startDateVacationsSeller)) > 0) {
            // tslint:disable-next-line:no-unused-expression
            !!this.startDateVacation && this.startDateVacation.setValue(this.today);
        } else {
            // tslint:disable-next-line:no-unused-expression
            !!this.startDateVacation && this.startDateVacation.setValue(startDateVacationsSeller);
        }
        this.endDateVacation.setValue(DateService.stringToDate(endDate));
    }

    /**
     * Metodo que actualiza el formulario de usuario con la data del usuario logeado
     * @param values
     */
    private setUserForm(values: any) {
        this.isChannel = false;
        if (values && values.Profile === 'seller' && values.Country !== 'COLOMBIA') {
            this.isChannel = true;
            this.channelAdvisor = values.TokenChannel;
        }
        this.form.patchValue(values);
        this.Nit.disable();
        this.Email.disable();
        this.SellerId.disable();
        this.StoreName.disable();
        this.loading.closeSpinner();
        this.getPermissions();
    }

    /**
     * Metodo que orquesta la creación del dialogo de cancelar vacaciones
     */
    public sendToOpenCancelVacationDialog() {
        const dataForm = this.setDataCancelVacationsDialog();
        const dialogInstance = this.openCancelVacationDialog(dataForm);
        this.configCancelDialog(dialogInstance);
    }

    /**
     * metodo que gestiona la confimación del dialogo
     * @param dialog dialogo de cancelación de vacaciones
     * @param index posición del vendedor
     */
    configCancelDialog(dialog: DialogWithFormComponent) {
        dialog.confirmation = () => {
            this.loading.viewSpinner();
            this.sotreService.cancelVacation({ IdSeller: this.user.IdSeller }).subscribe(val => {
                if (val.status === 200) {
                    const body = val.body.body;
                    const message = JSON.parse(body);
                    if (body && message && message.Message && message.Message === 'El usuario ha sido actualizado éxitosamente.') {
                        this.user.StartVacations = null;
                        this.user.EndVacations = null;
                        this.startDateVacation.reset(null);
                        this.endDateVacation.reset(null);
                        this.isInVacation = false;
                        this.snackBar.open(this.languageService.instant('shared.update_successfully_2') + this.user.Name, this.languageService.instant('actions.close'), {
                            duration: 3000,
                        });
                    } else {
                        this.profileService.getUser().toPromise().then(res => {
                            // tslint:disable-next-line:no-shadowed-variable
                            const body: any = res.body;
                            const response = JSON.parse(body.body);
                            const userData = response.Data;
                            this.setUserData(userData);
                        });
                    }
                } else {
                    this.modalService.showModal('errorService');
                }
                dialog.onNoClick();
                this.loading.closeSpinner();
            });
        };
    }

    /**
     * MEtodo que abre el dialogo con al data enviada por parametro
     * @param dataForm data a mostrar en el dialogo
     */
    openCancelVacationDialog(dataForm: any) {
        const dialogRef = this.dialog.open(DialogWithFormComponent, {
            data: dataForm,
            width: '55%',
            minWidth: '280px'
        });
        return dialogRef.componentInstance;
    }

    /**
     * Metodo que setea la data del formulario de cancelación de vacaciones programadas
     */
    setDataCancelVacationsDialog() {
        const message = this.languageService.instant('secure.seller.list.cancel_message_modal');
        const title = this.languageService.instant('secure.seller.list.cancel_title_modal');
        const icon = 'local_airport';
        const form = null;
        const messageCenter = false;
        const showButtons = true;
        const btnConfirmationText = null;
        return { message, title, icon, form, messageCenter, showButtons, btnConfirmationText };
    }

    /**
     * funcion para copiar el toker por medio de un text area
     *
     * @param {string} val
     * @memberof MyProfileComponent
     */
    copyToken(val: string) {
        this.clickBoarToken = true;
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

        const slider = document.querySelector('.slider');
        if (slider.classList.contains('opened')) {
            slider.classList.remove('opened');
            slider.classList.add('closed');
        } else {
            slider.classList.remove('closed');
            slider.classList.add('opened');
        }
        setTimeout(() => {
            if (slider.classList.contains('opened')) {
                slider.classList.remove('opened');
                slider.classList.add('closed');
            }
        }, 1000);
    }

    /**
     * funcion para cambiar la cultura
     *
     * @memberof QualityIndicatorsComponent
     */
    changeLanguaje() {
        this.languageService.onLangChange.subscribe((event: LangChangeEvent) => {
            localStorage.setItem('culture_current', event['lang']);
            this.getAllContactData();
        });
    }


    /**
     * retorna el campo nit del formulario de usuario
     */
    get Nit(): FormControl {
        return this.form.get('Nit') as FormControl;
    }

    /**
     * retorna el campo Email del formulario de usuario
     */
    get Email(): FormControl {
        return this.form.get('Email') as FormControl;
    }

    /**
     * retorna el campo del nombre de la tienda del formulario de usuario
     */
    get StoreName(): FormControl {
        return this.form.get('Name') as FormControl;
    }

    /**
     * retorna el campo de identificación del vendedor del formulario de usuario
     */
    get SellerId(): FormControl {
        return this.form.get('IdSeller') as FormControl;
    }

    /**
     * retorna el campo de inicio de vacaciones del formulario de vacaciones
     */
    get startDateVacation(): FormControl {
        return this.vacationForm.get('StartDateVacation') as FormControl;
    }

    /**
     * retorna el campo de fin de vacaciones del formulario de vacaciones
     */
    get endDateVacation(): FormControl {
        return this.vacationForm.get('EndDateVacation') as FormControl;
    }
}



export class Parameters {
    name: string;
    value: string;
}
