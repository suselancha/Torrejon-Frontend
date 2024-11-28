import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalesRoutingModule } from './sucursales-routing.module';
import { SucursalesComponent } from './sucursales.component';
import { CreateSucursalesComponent } from './create-sucursales/create-sucursales.component';
import { EditSucursalesComponent } from './edit-sucursales/edit-sucursales.component';
import { ListSucursalesComponent } from './list-sucursales/list-sucursales.component';
import { DeleteSucursalesComponent } from './delete-sucursales/delete-sucursales.component';
import { SearchClientsComponent } from './components/search-clients/search-clients.component';
import { SearchZonasComponent } from './components/search-zonas/search-zonas.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    SucursalesComponent,
    CreateSucursalesComponent,
    EditSucursalesComponent,
    ListSucursalesComponent,
    DeleteSucursalesComponent,
    SearchClientsComponent,
    SearchZonasComponent
  ],
  imports: [
    CommonModule,
    SucursalesRoutingModule,

    // admin *.module.ts
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
    //
  ]
})
export class SucursalesModule { }
