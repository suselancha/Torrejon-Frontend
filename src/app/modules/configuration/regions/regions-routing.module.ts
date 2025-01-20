import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionsComponent } from './regions.component';
import { ListRegionsComponent } from './list-regions/list-regions.component';

const routes: Routes = [
  {
    path:'',
    component:RegionsComponent,
    children:[
      {
        path:'list',
        component:ListRegionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
