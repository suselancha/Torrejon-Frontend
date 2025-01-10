import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksComponent } from './banks.component';
import { ListBanksComponent } from './list-banks/list-banks.component';

const routes: Routes = [
  {
    path: '',
    component: BanksComponent,
    children: [
      {
        path: 'list',
        component: ListBanksComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
