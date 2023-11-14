import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormErrorsPipe } from './pipes/pipes/form-errors.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FullnamePipe } from './pipes/pipes/fullname.pipe';


@NgModule({
  declarations: [FormErrorsPipe, FullnamePipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  exports:[
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    FormErrorsPipe,
    MatToolbarModule,
    MatButtonModule,
    FullnamePipe
  ]
})
export class SharedModule { }
