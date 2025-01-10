import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { EmployeeFunctionModule } from './employee-function/employee-function.module';
import { ClientSegmentModule } from './client-segment/client-segment.module';
import { ZonasModule } from './zonas/zonas.module';
import { BanksModule } from './banks/banks.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,

    // Modulos
    EmployeeFunctionModule,
    ClientSegmentModule,
    ZonasModule,
    BanksModule
  ]
})
export class ConfigurationModule { }
