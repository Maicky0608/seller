import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from '@app/secure/error-page/error-page.component';
import { RoutesConst } from './../../../shared';
import { environment } from '@env/environment';

import { InDevolutionComponent } from './in-devolution-page/in-devolution.component';

const isProductionEnv = environment.production;

const routes: Routes = [
    {
        path: `${RoutesConst.sellerCenterIntOrderInDevolution}`,
        component: !isProductionEnv ? InDevolutionComponent : ErrorPageComponent,
        data: { title: 'En devolución' },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class BillingRoutingModule { }
