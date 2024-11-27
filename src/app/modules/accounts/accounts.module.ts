import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { CreateAccountsComponent } from './create-accounts/create-accounts.component';
import { EditAccountsComponent } from './edit-accounts/edit-accounts.component';
import { DeleteAccountsComponent } from './delete-accounts/delete-accounts.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ShowAccountsComponent } from './show-accounts/show-accounts.component';

@NgModule({
  declarations: [
    AccountsComponent,
    CreateAccountsComponent,
    EditAccountsComponent,
    DeleteAccountsComponent,
    ListAccountsComponent,
    ShowAccountsComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    // admin *.module.ts
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
    
    //Module for autocomplete
  ]
})
export class AccountsModule { }
