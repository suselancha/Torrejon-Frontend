import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { CreateClientsPersonComponent } from './create-clients-person/create-clients-person.component';
import { EditClientsPersonComponent } from './edit-clients-person/edit-clients-person.component';
import { DeleteClientsComponent } from './delete-clients/delete-clients.component';
import { ListsClientsComponent } from './lists-clients/lists-clients.component';
import { CreateClientsCompanyComponent } from './create-clients-company/create-clients-company.component';
import { EditClientsCompanyComponent } from './edit-clients-company/edit-clients-company.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CreateClientComponent } from './create-client/create-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';


@NgModule({
  declarations: [
    ClientsComponent,
    CreateClientsPersonComponent,
    EditClientsPersonComponent,
    DeleteClientsComponent,
    ListsClientsComponent,
    CreateClientsCompanyComponent,
    EditClientsCompanyComponent,
    CreateClientComponent,
    EditClientComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,

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
export class ClientsModule { }
