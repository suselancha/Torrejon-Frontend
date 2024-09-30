import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFunctionComponent } from './employee-function.component';
import { ListEmployeeFunctionComponent } from './list-employee-function/list-employee-function.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeFunctionComponent,
    children: [
      {
        path: 'list',
        component: ListEmployeeFunctionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeFunctionRoutingModule { }
