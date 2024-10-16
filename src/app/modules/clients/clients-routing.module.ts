import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsClientsComponent } from './lists-clients/lists-clients.component';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'list',
        component: ListsClientsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
