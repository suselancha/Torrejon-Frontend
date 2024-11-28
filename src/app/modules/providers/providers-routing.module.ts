import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersComponent } from './providers.component';
import { ListsProvidersComponent } from './lists-providers/lists-providers.component';
import { CreateProvidersComponent } from './create-providers/create-providers.component';
import { EditProvidersComponent } from './edit-providers/edit-providers.component';

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent,
    children: [
      {
        path: 'list',
        component: ListsProvidersComponent
      },
      {
        path: 'registro',
        component: CreateProvidersComponent
      },
      {
        path: 'list/editar/:id',
        component: EditProvidersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
