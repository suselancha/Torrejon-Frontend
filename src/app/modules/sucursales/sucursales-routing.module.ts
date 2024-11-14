import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucursalesComponent } from './sucursales.component';
import { ListSucursalesComponent } from './list-sucursales/list-sucursales.component';
import { CreateSucursalesComponent } from './create-sucursales/create-sucursales.component';
import { EditSucursalesComponent } from './edit-sucursales/edit-sucursales.component';

const routes: Routes = [
  {
    path: '',
    component: SucursalesComponent,
    children: [
      {
        path: 'listado',
        component: ListSucursalesComponent
      },
      {
        path: 'crear',
        component: CreateSucursalesComponent
      },
      {
        path: 'listado/edicion/:id',
        component: EditSucursalesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalesRoutingModule { }
