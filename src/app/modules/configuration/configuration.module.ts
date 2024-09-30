import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { EmployeeFunctionModule } from './employee-function/employee-function.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,

    // Modulos
    EmployeeFunctionModule
  ]
})
export class ConfigurationModule { }
