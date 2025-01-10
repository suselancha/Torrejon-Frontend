import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanksRoutingModule } from './banks-routing.module';
import { BanksComponent } from './banks.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CreateBanksComponent } from './create-banks/create-banks.component';
import { DeleteBanksComponent } from './delete-banks/delete-banks.component';
import { EditBanksComponent } from './edit-banks/edit-banks.component';
import { ListBanksComponent } from './list-banks/list-banks.component';

@NgModule({
  declarations: [
    BanksComponent,
    CreateBanksComponent,
    DeleteBanksComponent,
    EditBanksComponent,
    ListBanksComponent
  ],
  imports: [
    CommonModule,
    BanksRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})

export class BanksModule { }
