import { DragDropModule } from '@angular/cdk/drag-drop';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';

/**
 *  Módulo que permitira importar los componentes de Angular material y Angular Flex layout en el app.module.
 *
 * [Angular material]{@link https://material.angular.io/}
 * [Flex Layout]{@link https://tburleson-layouts-demos.firebaseapp.com/#/docs}
 */
@NgModule({
  imports: [
    // Angular Material
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatTooltipModule,
    MatSortModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSliderModule,
    MatTreeModule,
    // Flex layout
    FlexLayoutModule,
    MatBottomSheetModule
  ],
  exports: [
    // Angular Material
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatTooltipModule,
    MatSortModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSliderModule,
    MatTreeModule,
    // Flex layout
    FlexLayoutModule,
    DragDropModule,
    MatBottomSheetModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MaterialModule {
}
