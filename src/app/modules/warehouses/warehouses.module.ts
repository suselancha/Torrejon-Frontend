import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousesRoutingModule } from './warehouses-routing.module';
import { WarehousesComponent } from './warehouses.component';
import { ListWarehousesComponent } from './list-warehouses/list-warehouses.component';
import { CreateWarehousesComponent } from './create-warehouses/create-warehouses.component';
import { EditWarehousesComponent } from './edit-warehouses/edit-warehouses.component';
import { DeleteWarehousesComponent } from './delete-warehouses/delete-warehouses.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    WarehousesComponent,
    ListWarehousesComponent,
    CreateWarehousesComponent,
    EditWarehousesComponent,
    DeleteWarehousesComponent
  ],
  imports: [
    CommonModule,
    WarehousesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class WarehousesModule { }
