import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Route } from '@app/core';
import { RoutesConst } from './../../../shared';
import { ListComponent } from './list/list.component';
import { TermsService } from '@app/secure/seller/agreement/terms/terms.component.service';
import { AuthService } from '@app/secure/auth/auth.routing';


const routes: Routes = [
  Route.withShell([
    {
      path: `${RoutesConst.sellerCenterIntOfersList}`,
      component: ListComponent,
      data: { title: 'Listado de Ofertas' },
      canActivate: [TermsService, AuthService]
    }
  ])
];

/**
 *
 * @export
 * @class ListRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListRoutingModule {
}
