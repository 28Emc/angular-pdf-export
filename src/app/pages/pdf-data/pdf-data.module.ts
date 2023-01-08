import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfDataRoutingModule } from './pdf-data-routing.module';
import { PdfDataComponent } from './pdf-data.component';


@NgModule({
  declarations: [
    PdfDataComponent
  ],
  imports: [
    CommonModule,
    PdfDataRoutingModule,
    MatButtonModule
  ]
})
export class PdfDataModule { }
