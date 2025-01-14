import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

const routes: Routes = [
  {
    path:'',
    component: ProductsComponent,
    children: [
      {
        path:'list',
        component: ListProductsComponent
      },
      {
        path:'create',
        component: CreateProductsComponent
      },
      {
        path:'edit/:id',
        component: EditProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
