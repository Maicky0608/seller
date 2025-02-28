import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule
  ],
  exports: [
    DeleteDialogComponent
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [
  ],
})
export class DeleteDialogModule { }
