import { Component } from '@angular/core';
import { ClientsService } from '../service/clients.service';
import { ImportClientsComponent } from '../import-clients/import-clients.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccountsComponent } from '../../accounts/create-accounts/create-accounts.component';
import { ShowAccountsComponent } from '../../accounts/show-accounts/show-accounts.component';

@Component({
  selector: 'app-lists-clients',
  templateUrl: './lists-clients.component.html',
  styleUrls: ['./lists-clients.component.scss']
})
export class ListsClientsComponent {
  search:string = '';
  client_segment_id:string = '';

  CLIENTS:any;
  CLIENT_SEGMENTS:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(    
    public clientsService: ClientsService,
    public modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.clientsService.isLoading$;
    this.listClients();
    this.listConfig();
  }

  listConfig(){    
    this.clientsService.configAll().subscribe((resp:any) => {
      //console.log(resp);
      this.CLIENT_SEGMENTS = resp.client_segments; // Respuesta del backend      
    })
  }

  resetlistClients(){
    this.search = '';
    this.client_segment_id = '';
    this.listClients();
  }

  listClients(page=1) {
    let data = {
      search: this.search,
      client_segment_id: this.client_segment_id,
    }
    this.clientsService.listClients(page, data).subscribe((resp: any) => {
      console.log(resp);
      this.CLIENTS = resp.clients.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event:any) {
    this.listClients($event);
  }

  createClient() {
    
  }

  editClient(CLIENT:any) {
    
  }

  deleteClient(CLIENT:any) {
    
  }

  importClients(){
    const modalRef = this.modalService.open(ImportClientsComponent,{centered: true, size: 'md'});
    // Output: importClient
    modalRef.componentInstance.importClient.subscribe((resp:any) => {
      this.listClients();
    })
  }

  createAccount(ACCOUNTABLE:any) {
    const modalRef = this.modalService.open(CreateAccountsComponent,{centered: true, size: 'md'});
    // Paso el id del cliente con la variable "CLIENT_SELECTED"
    modalRef.componentInstance.ACCOUNTABLE_SELECTED = ACCOUNTABLE;
    modalRef.componentInstance.ACCOUNTABLE_TYPE = 'client';
    /* modalRef.componentInstance.ClientC.subscribe((role:any) => {      
    }); */
  }

  showAccounts(CLIENT:any, ACTION:string) {
    const modalRef = this.modalService.open(ShowAccountsComponent,{centered: true, size: 'md'});
    // Paso el id del cliente con la variable "CLIENT_SELECTED"
    modalRef.componentInstance.ACCOUNTABLE_TYPE = 'client';
    modalRef.componentInstance.ACCOUNTABLE_ID = CLIENT.id;
    modalRef.componentInstance.ACCOUNT_ACTION = ACTION;
    /* modalRef.componentInstance.ClientE.subscribe((client:any) => {
    }); */
  }
  
}
