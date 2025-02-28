import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Route } from '@app/core';
import { RoutesConst } from '@app/shared';
import { AuthService } from '@app/secure/auth/auth.routing';
import { CitiesCoverageComponent } from './cities-coverage-page/cities-coverage.component';

const routes = [
  Route.withShell([
    {
      path: `${RoutesConst.sellerCenterIntOfferCitiesCoverage}`,
      component: CitiesCoverageComponent,
      data: { title: 'Ciudades con Cobertura' },
      canActivate: [AuthService]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CitiesCoverageRoutingModule {}
