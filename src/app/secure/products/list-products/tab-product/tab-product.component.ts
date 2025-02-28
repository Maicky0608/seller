import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserInformation } from '@app/shared';
import { UserParametersService } from '@app/core';
import { MatTabChangeEvent } from '@angular/material';


@Component({
  selector: 'app-tab-product',
  templateUrl: './tab-product.component.html',
  styleUrls: ['./tab-product.component.scss']
})
export class TabProductComponent implements OnInit, AfterViewInit {
  public user: UserInformation;
  showTabs = true;
  showButtonDownload:Boolean = true;

  constructor(
    public userParams: UserParametersService,
  ) { }

  ngOnInit() {
    this.getDataUser();
  }
  ngAfterViewInit() {
    const principalToolbar = document.getElementsByClassName('mat-tab-label');
    principalToolbar[0].classList.add('mat-tab-label-size');
    principalToolbar[1].classList.add('mat-tab-label-size');
  }

  async getDataUser() {
    this.user = await this.userParams.getUserData();
    if (this.user.sellerProfile === 'seller') {
      this.showTabs = true;
    } else {
      this.showTabs = false;
    }
  }

  onTabChanged(e:MatTabChangeEvent) {
    if(e.index !== 0) {
      this.showButtonDownload = false;
    } else{
      this.showButtonDownload = true;
    }
  }

}
