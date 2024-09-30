import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeFunctionRoutingModule } from './employee-function-routing.module';
import { EmployeeFunctionComponent } from './employee-function.component';
import { CreateEmployeeFunctionComponent } from './create-employee-function/create-employee-function.component';
import { EditEmployeeFunctionComponent } from './edit-employee-function/edit-employee-function.component';
import { DeleteEmployeeFunctionComponent } from './delete-employee-function/delete-employee-function.component';
import { ListEmployeeFunctionComponent } from './list-employee-function/list-employee-function.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    EmployeeFunctionComponent,
    CreateEmployeeFunctionComponent,
    EditEmployeeFunctionComponent,
    DeleteEmployeeFunctionComponent,
    ListEmployeeFunctionComponent
  ],
  imports: [
    CommonModule,
    EmployeeFunctionRoutingModule,

    // admin *.module.ts
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
    //
  ]
})
export class EmployeeFunctionModule { }
