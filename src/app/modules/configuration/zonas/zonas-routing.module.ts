import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonasComponent } from './zonas.component';
import { ListZonaComponent } from './list-zona/list-zona.component';

const routes: Routes = [
  {
    path:'',
    component: ZonasComponent,
    children: [
      {
        path: 'list',
        component: ListZonaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonasRoutingModule { }
