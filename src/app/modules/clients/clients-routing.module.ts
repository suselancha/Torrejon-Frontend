import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsClientsComponent } from './lists-clients/lists-clients.component';
import { ClientsComponent } from './clients.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'list',
        component: ListsClientsComponent
      },
      {
        path: 'registro',
        component: CreateClientComponent
      },
      {
        path: 'list/editar/:id',
        component: EditClientComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
