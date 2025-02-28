import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Modules, ModuleModel, MenuModel, ProfileTypes } from './auth.consts';
import { UserParametersService, UserLoginService, EndpointService } from '@app/core';
import { RoutesConst, UserInformation } from '@app/shared';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthRoutingService } from './auth.service';
import { CoreState } from '@app/store';
import { Store } from '@ngrx/store';
import { StartModules } from '@app/store/commons/actions';
import { GetAllDevolutions } from '@app/store/notifications/actions';

@Injectable()
export class AuthService implements CanActivate {

    modulesRouting: ModuleModel[] = Modules;
    modulesBack: ModuleModel[];
    userData: any;
    completeUserData: any;
    admin = 'administrator';
    adminType = 1;
    types = ['Tienda', 'Exito'];
    getData = false;
    profileTypeGlobal = null;
    user: UserInformation;
    userProfiel: any;

    // Modulos habilitados del usuario logeado
    availableModules;

    // Subject que devuelve los modulos habiitados
    availableModules$ = new BehaviorSubject(null);
    profileType$ = new BehaviorSubject(null);

    constructor(public userParams: UserParametersService,
        public router: Router,
        public userService: UserLoginService,
        private http: HttpClient,
        private api: EndpointService,
        private userDataService: AuthRoutingService,
        private store: Store<CoreState>) {
        // tslint:disable-next-line:no-unused-expression
        !!this.userService && this.userService.isLogin$.pipe(distinctUntilChanged()).subscribe(val => {
            if (!val) {
                this.completeUserData = null;
                this.modulesBack = null;
            }
        });
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // Console solo para verificar ruta y estado de la misma.
        // console.warn('AuthService', state);
        // console.warn('AuthService', route);
        // Promesa para verificar estados del usuario y la ruta a la que intenta entrar
        if (state.url !== '/' + RoutesConst.sellerCenterLogout && state.url) {
            return new Promise((resolve, reject) => {
                this.getModulesFromService().then(resultModule => {
                    this.modulesBack = resultModule;
                    const moduleSelected = this.validateModule(state.url); // Verfica a que menu desea ingresar
                    this.verifyLog(); // Verifica si esta logueado
                    if (moduleSelected) { // Verifica si si esta ingresando a un menu mapeado.
                        this.userParams.getUserData().then(data => {
                            this.userData = data;
                            // Valida si al menu que intenta ingresar posee el tipo del usuario.
                            const result = this.profileTypeGlobal === this.types[1] ? moduleSelected.ProfileType === ProfileTypes.Administrador : moduleSelected.ProfileType === ProfileTypes.Vendedor;
                            resolve(result);
                            // this.redirectToHome(result, state);
                        }, error => {
                            console.error(error);
                            reject(false);
                            this.redirectToHome(false, state, true);
                        });
                    } else {
                        if (state.url === '/' + RoutesConst.sellerCenterIntDashboard || state.url === '/' + RoutesConst.securehome) {
                            this.userParams.getUserData().then(data => {
                                this.userData = data;
                                // Valida si es vendedor e intenta ver el dahsboard.
                                const Seller = this.profileTypeGlobal === this.types[0];
                                if (!Seller) {
                                    this.redirectToHome(false, null);
                                }
                                resolve(Seller);
                            }, error => {
                                console.error(error);
                                reject(false);
                                this.redirectToHome(false, state, true);
                            });
                        } else {
                            this.redirectToHome(false, state);
                            reject(true);
                        }
                    }
                }, error => {

                });
            });
        } else {
            this.modulesBack = null;
            this.cleanModules();
            return true;
        }
    }

    /**
     * Limpiar modulos.
     *
     * @memberof AuthService
     */
    public cleanModules(): void {
        this.modulesRouting.forEach(item => {
            item.ShowModule = false;
            item.Menus.forEach(menu => {
                menu.ShowMenu = false;
                menu.Functionalities.forEach(functions => {
                    functions.ShowFunctionality = false;
                });
            });
        });
        this.getData = false;
    }

    public getModulesFromService(): any {
        return new Promise((resolve, reject) => {
            if (!this.modulesBack) {
                if (!this.completeUserData) {
                    this.userDataService.getUser().subscribe((res: any) => {
                        this.completeUserData = !!JSON.parse(res.body).Data ? JSON.parse(res.body).Data : null;
                    });
                }
                this.http.get(this.api.get('getPermissions')).subscribe((result: any) => {
                    if (this.userService.isLogin$.value === null) {
                        this.userService.isLogin$.next(true);
                    }
                    this.getData = true;
                    if (result.body) {
                        const data = JSON.parse(result.body);
                        if (data.Data && data.Data.Profile) {
                            const profileTye = data.Data.Profile.ProfileType;
                            this.profileTypeGlobal = profileTye;
                            this.profileType$.next(this.profileTypeGlobal);
                            this.availableModules = data.Data.Profile.Modules;
                            this.availableModules$.next(this.availableModules);
                            data.Data.Profile.Modules.forEach(moduleItem => {
                                this.modulesRouting.forEach(item => {
                                    let showModule = false;
                                    if (item.NameModule.toLowerCase() === moduleItem.Name.toLowerCase()) {
                                        moduleItem.Menus.forEach(element => {
                                            item.Menus.forEach(menu => {
                                                if (this.types[menu.ProfileType] === profileTye && element.Name.toLowerCase() === menu.NameMenu.toLowerCase()) {
                                                    menu.ShowMenu = true;
                                                    showModule = true;
                                                    menu.Functionalities.forEach(functions => {
                                                        element.Actions.forEach(actions => {
                                                            if (functions.NameFunctionality.toLowerCase() === actions.toLowerCase()) {
                                                                functions.ShowFunctionality = true;
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    }
                                    if (!item.ShowModule) {
                                        item.ShowModule = showModule;
                                    }
                                });
                            });
                            this.modulesBack = this.modulesRouting;
                            this.store.dispatch(new StartModules(this.modulesRouting));
                            if (profileTye === 'Tienda') {
                                this.store.dispatch(new GetAllDevolutions());
                            }
                            resolve(this.modulesRouting);
                        }
                    }
                }, error => {
                    // this.router.navigate([`/${RoutesConst.sellerCenterLogout}`]);
                    this.store.dispatch(new StartModules(null));
                    this.store.dispatch(new GetAllDevolutions());
                    resolve(false);
                });
            } else {
                this.store.dispatch(new StartModules(this.modulesBack));
                this.store.dispatch(new GetAllDevolutions());
                resolve(this.modulesBack);
            }
        });
    }

    /**
     * Redirecciona a la pagina principal.
     *
     * @param {boolean} result
     * @memberof AuthService
     */
    public redirectToHome(result: boolean, state: RouterStateSnapshot, redirectLog: boolean = false): void {
        if (!result && !redirectLog) {
            let redirect = false;
            let oneTime = true;
            this.modulesRouting.forEach(element => {
                if (element.ShowModule) {
                    element.Menus.forEach(menu => {
                        if (menu.ShowMenu && oneTime) {
                            redirect = true;
                            oneTime = false;
                            if (!menu.UrlRedirect.includes('s3-website-us')) {
                                this.router.navigate([`/${menu.UrlRedirect}`]);
                            }
                        }
                    });
                }
            });
            if (!redirect) {
                this.router.navigate([`/${RoutesConst.sellerCenterLogout}`]);
            }
        } else if (redirectLog) {
            this.router.navigate([`/${RoutesConst.sellerCenterLogout}`]);
        }
    }

    /**
     * Verifica si el usuario esta logueado.
     *
     * @memberof AuthService
     */
    public verifyLog(): void {
        this.userService.isAuthenticated(this);
    }

    /**
     * Vefica si esta logueado.
     *
     * @param {string} message
     * @param {boolean} isLoggedIn
     * @memberof AuthService
     */
    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate([`/${RoutesConst.home}`]);
        }
    }

    /**
     * Valida el menu al que intenta acceder, con la URL y verifica con el ShowMenu,
     * si puede acceder como usuario o no. retorna null, si no posee permisos.
     *
     * @param {*} state
     * @returns {MenuModel}
     * @memberof AuthService
     */
    public validateModule(url: any): MenuModel {
        let moduleSelected: MenuModel;
        // a litle machete here because navigate with params give that params with ';'
        url = url.search(';') > -1 ? url.slice(0, url.search(';')) : url;
        Modules.forEach(item => {
            item.Menus.forEach(menu => {
                if (url === '/' + menu.UrlRedirect && menu.ShowMenu) {
                    moduleSelected = menu;
                }
            });
        });
        return moduleSelected;
    }

    /**
     * Obtener modulos, menus y funcionalidades.
     *
     * @returns {ModuleModel[]}
     * @memberof AuthService
     */
    public getModules(): any {
        return new Promise((resolve, reject) => {
            if (this.getData) {
                resolve(this.modulesRouting);
            } else {
                resolve(this.getModulesFromService());
            }
        });
    }

    /**
     * Obtener menu por nombre
     *
     * @returns {ModuleModel[]}
     * @memberof AuthService
     */
    public getMenu(nameMenu: any): MenuModel {
        let moduleSelected: MenuModel;
        this.modulesRouting.forEach(item => {
            const resultado = item.Menus.find(menu => nameMenu === menu.NameMenu);
            if (resultado) {
                moduleSelected = resultado;
                return true;
            }
        });
        if (moduleSelected && moduleSelected.ShowMenu) {
            return moduleSelected;
        } else {
            return null;
        }
    }

    async validateUserType() {
        this.user = await this.userParams.getUserData();
        return this.user;
    }

    public getMenuProfiel(nameMenu: any, profile: any): MenuModel {
        let moduleSelected: MenuModel;
        this.modulesRouting.forEach(item => {
            const resultado = item.Menus.find(menu => nameMenu === menu.NameMenu && menu.ProfileType === profile);
            if (resultado) {
                moduleSelected = resultado;
                return true;
            }
        });
        if (moduleSelected && moduleSelected.ShowMenu) {
            return moduleSelected;
        } else {
            return null;
        }
    }

    /**
     * Verifica la existencia del permiso dentro del menu
     * @param menu Name for specific menu
     * @param permission Name of permission
     */
    getPermissionForMenu(menu: string, permission: string) {
        const existMenu = this.getMenu(menu);
        const existPermission = !!existMenu && existMenu.Functionalities.find(result => permission === result.NameFunctionality);
        return !!existPermission && existPermission.ShowFunctionality;
    }

    /**
     * Setear los modulos, menus y funcionalidades.
     *
     * @param {ModuleModel[]} modules
     * @memberof AuthService
     */
    public setModules(modules: ModuleModel[]): void {
        this.modulesRouting = modules;
    }

    private validationModuleSelected(selectedModule: any): void {
        let find;
        this.availableModules.forEach(menu => {
            menu.Menus.forEach(subMenu => {
                if (subMenu.Name.toLowerCase().trim() === selectedModule.NameMenu.toLowerCase().trim()) {
                    find = true;
                }
            });
        });
        return find;
    }


}
