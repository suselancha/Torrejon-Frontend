import { Component } from '@angular/core';
import { ClientsService } from '../service/clients.service';
import { ImportClientsComponent } from '../import-clients/import-clients.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
}
