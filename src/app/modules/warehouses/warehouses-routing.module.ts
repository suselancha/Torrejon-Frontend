import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehousesComponent } from './warehouses.component';
import { ListWarehousesComponent } from './list-warehouses/list-warehouses.component';
import { CreateWarehousesComponent } from './create-warehouses/create-warehouses.component';
import { EditWarehousesComponent } from './edit-warehouses/edit-warehouses.component';

const routes: Routes = [
  {
    path:'',
    component: WarehousesComponent,
    children: [
      {
        path:'list',
        component: ListWarehousesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehousesRoutingModule { }
