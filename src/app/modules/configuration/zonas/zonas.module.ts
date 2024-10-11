import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonasRoutingModule } from './zonas-routing.module';
import { ZonasComponent } from './zonas.component';
import { CreateZonaComponent } from './create-zona/create-zona.component';
import { EditZonaComponent } from './edit-zona/edit-zona.component';
import { DeleteZonaComponent } from './delete-zona/delete-zona.component';
import { ListZonaComponent } from './list-zona/list-zona.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    ZonasComponent,
    CreateZonaComponent,
    EditZonaComponent,
    DeleteZonaComponent,
    ListZonaComponent
  ],
  imports: [
    CommonModule,
    ZonasRoutingModule,

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
export class ZonasModule { }
