import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcategoriesComponent } from './subcategories.component';
import { ListSubcategoriesComponent } from './list-subcategories/list-subcategories.component';

const routes: Routes = [
  {
    path:'',
    component: SubcategoriesComponent,
    children: [
      {
        path:'list',
        component: ListSubcategoriesComponent
      },
      {
        path:'list/:id',
        component: ListSubcategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriesRoutingModule { }
