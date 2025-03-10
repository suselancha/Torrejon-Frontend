import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';
import { IncreaseStocksComponent } from './increase-stocks/increase-stocks.component';
import { DecreaseStocksComponent } from './decrease-stocks/decrease-stocks.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ListStocksComponent } from './list-stocks/list-stocks.component';
import { ShowStocksComponent } from './show-stocks/show-stocks.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    StocksComponent,
    ListStocksComponent,
    IncreaseStocksComponent,
    DecreaseStocksComponent,
    ShowStocksComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
    NgSelectModule,
  ]
})
export class StocksModule { }
