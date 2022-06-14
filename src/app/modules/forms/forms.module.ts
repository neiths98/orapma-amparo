import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { SimulationFormComponent } from './simulation-form/simulation-form.component';
import { ReactiveFormsModule, FormsModule as Fm } from '@angular/forms';


@NgModule({
  declarations: [
    SimulationFormComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    Fm,
    ReactiveFormsModule
  ],
  exports: [
    SimulationFormComponent
  ]
})
export class FormsModule { }
