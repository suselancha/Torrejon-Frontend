import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './stocks.component';
import { ListStocksComponent } from './list-stocks/list-stocks.component';
import { ShowStocksComponent } from './show-stocks/show-stocks.component';

const routes: Routes = [
  {
    path:'',
    component: StocksComponent,
    children: [
      {
        path:'list',
        component: ListStocksComponent
      },
      {
        path:'show/:id',
        component: ShowStocksComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
