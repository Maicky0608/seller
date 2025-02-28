import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { SchoolExitoService } from '@app/secure/school-exito/school-exito.service';
import { ComponentsService } from '@app/shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-module',
  templateUrl: './delete-module.component.html',
  styleUrls: ['./delete-module.component.scss']
})
export class DeleteModuleComponent implements OnInit {

  dataToDelete:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteModuleComponent>,
    public _schoolExito: SchoolExitoService,
    public componentService: ComponentsService,
    private languageService: TranslateService,
    private router: Router
  ) {
    this.dataToDelete = data;
  }

  ngOnInit() {
  }

  /**
   * cierra la modal
   */

  public close(): void {
    this.dialogRef.close();
  }

  /**
   * Servicio para eliminar los modulos
   */

  public deleteModule() {
    const {Id} = this.dataToDelete;
    let dataEncode = encodeURI(Id);
    this._schoolExito.deleteModule(dataEncode).subscribe((resp:any) => {
      let body = JSON.parse(resp.body.body);
      if (resp.status === 200) {
        this.componentService.openSnackBar(this.languageService.instant('school.exito.delete.module.service'), this.languageService.instant('actions.close'), 5000);
        this.dialogRef.close();
        this.router.navigateByUrl('/SchoolExitoComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/securehome/schoolExito/list-school-exito']);
      }); 
      } else {
        this.componentService.openSnackBar(body.Errors[0].Message, this.languageService.instant('actions.close'), 5000);
      } 
    })
  }

}
