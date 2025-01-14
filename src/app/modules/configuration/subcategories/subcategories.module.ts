import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { SubcategoriesComponent } from './subcategories.component';
import { CreateSubcategoriesComponent } from './create-subcategories/create-subcategories.component';
import { EditSubcategoriesComponent } from './edit-subcategories/edit-subcategories.component';
import { DeleteSubcategoriesComponent } from './delete-subcategories/delete-subcategories.component';
import { ListSubcategoriesComponent } from './list-subcategories/list-subcategories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    SubcategoriesComponent,
    CreateSubcategoriesComponent,
    EditSubcategoriesComponent,
    DeleteSubcategoriesComponent,
    ListSubcategoriesComponent
  ],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class SubcategoriesModule { }
