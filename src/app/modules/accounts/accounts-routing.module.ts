import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import { CreateAccountsComponent } from './create-accounts/create-accounts.component';
import { EditAccountsComponent } from './edit-accounts/edit-accounts.component';
import { AccountsComponent } from './accounts.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'list',
        component: ListAccountsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
