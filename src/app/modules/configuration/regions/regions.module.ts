import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionsRoutingModule } from './regions-routing.module';
import { CreateRegionsComponent } from './create-regions/create-regions.component';
import { DeleteRegionsComponent } from './delete-regions/delete-regions.component';
import { EditRegionsComponent } from './edit-regions/edit-regions.component';
import { ListRegionsComponent } from './list-regions/list-regions.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RegionsComponent } from './regions.component';


@NgModule({
  declarations: [
    RegionsComponent,
    CreateRegionsComponent,
    DeleteRegionsComponent,
    EditRegionsComponent,
    ListRegionsComponent
  ],
  imports: [
    CommonModule,
    RegionsRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class RegionsModule { }
