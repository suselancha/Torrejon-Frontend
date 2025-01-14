import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { DeleteCategoriesComponent } from './delete-categories/delete-categories.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoriesComponent,
    EditCategoriesComponent,
    DeleteCategoriesComponent,
    ListCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class CategoriesModule { }
