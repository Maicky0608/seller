import { Component, OnInit } from '@angular/core';
import { MyProfileService } from '@app/secure/aws-cognito/profile/myprofile.service';

@Component({
  selector: 'app-list-school-exito',
  templateUrl: './list-school-exito.component.html',
  styleUrls: ['./list-school-exito.component.scss']
})
export class ListSchoolExitoComponent implements OnInit {

  public isAdmin: boolean;
  public load = false;

  constructor(
    private profileService: MyProfileService,
  ) {
  }

  ngOnInit() {
    this.getAllDataUser();
  }

/**
 * funcion para verificar si es admin o vendedor y mostrar el componente
 *
 * @memberof ListSchoolExitoComponent
 */
async getAllDataUser() {
    const sellerData = await this.profileService.getUser().toPromise().then(res => {
      const body: any = res.body;
      const response = JSON.parse(body.body);
      const userData = response.Data;
      localStorage.setItem('typeProfile', userData.Profile);
      if (userData.Profile !== 'seller' && userData.Profile && userData.Profile !== null) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      this.load = true;
    });
  }
}
