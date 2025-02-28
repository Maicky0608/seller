import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Logger } from '@app/core';
import { SearchFormEntity } from '@app/shared/models';
import { ShellComponent } from '@core/shell/shell.component';

// log components
const log = new Logger('SideBarSearchOrdersComponent');

/**
 * Component Que permite realizar el filtro personalizado por el usaurio para realizar la busqueda de una orden.
 * este componente puede ser llamado desde diferentes Componentes así que sus filtros varian de acuerdo de donde se llame
 */
@Component({
  selector: 'app-search-order-menu',
  templateUrl: './search-order-menu.component.html',
  styleUrls: ['./search-order-menu.component.scss'],
})

/**
 * Component
 */
export class SearchOrderMenuComponent implements OnInit {

  // Sidenav principal
  @Input() sidenavSearchOrder: MatSidenav;
  // Variable que almacena los datos que se le pueden pasar al formulario
  @Input() informationToForm: SearchFormEntity;

  @Input() idSeller: number;
  @Input() typeProfiel: number;
  @Input() state: number;
  @Input() paginator: number;

  /**
   * Creates an instance of SearchOrderMenuComponent.
   * @param {ShellComponent} shellComponent
   * @memberof SearchOrderMenuComponent
   */
  constructor(
    public shellComponent: ShellComponent
  ) {
  }

  /**
   * @memberof SearchOrderMenuComponent
   */
  ngOnInit() {
  }

  /**
   * Funcionalidad que permite desplegar el menú.
   * @memberof SidebarComponent
   */
  toggleMenu(): void {
    this.sidenavSearchOrder.toggle();
  }
}
