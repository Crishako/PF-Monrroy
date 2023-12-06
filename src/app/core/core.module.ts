import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
})
export class CoreModule { }
