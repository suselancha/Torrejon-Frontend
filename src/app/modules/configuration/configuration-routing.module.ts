import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'funcion-de-empleado',
    loadChildren: () => import('./employee-function/employee-function.module').then((m) => m.EmployeeFunctionModule),
  },
  {
    path: 'segmento-de-cliente',
    loadChildren: () => import('./client-segment/client-segment.module').then((m) => m.ClientSegmentModule),
  },
  {
    path: 'zonas',
    loadChildren: () => import('./zonas/zonas.module').then((m) => m.ZonasModule),
  },
  {
    path: 'banks',
    loadChildren: () => import('./banks/banks.module').then((m) => m.BanksModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
