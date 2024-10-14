import { Component } from '@angular/core';
import { CreateClientsCompanyComponent } from '../create-clients-company/create-clients-company.component';
import { CreateClientsPersonComponent } from '../create-clients-person/create-clients-person.component';
import { EditClientsCompanyComponent } from '../edit-clients-company/edit-clients-company.component';
import { EditClientsPersonComponent } from '../edit-clients-person/edit-clients-person.component';
import { DeleteClientsComponent } from '../delete-clients/delete-clients.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from '../service/clients.service';

@Component({
  selector: 'app-lists-clients',
  templateUrl: './lists-clients.component.html',
  styleUrls: ['./lists-clients.component.scss']
})
export class ListsClientsComponent {
  search:string = '';
  CLIENTS:any = [];
  isLoading$:any;
  client_segment_id:string = '';
  type:string = '';

  totalPages:number = 0;
  currentPage:number = 0;

  client_segments:any = [];

  constructor(
    public modalService: NgbModal,
    public clientsService : ClientsService,
  ) {

  }

  ngOnInit(): void {
    // Renderizado del servicio con el componente
    this.isLoading$ = this.clientsService.isLoading$;
    this.listClients();
    this.listConfig();
  }

  resetlistClients(){
    this.search = '';
    this.client_segment_id = '',
    this.type = '';
    this.listClients();
  }

  listClients(page = 1){
    let data = {
      search: this.search,
      client_segment_id: this.client_segment_id,
      type: this.type
    }

    this.clientsService.listClients(page,data).subscribe((resp:any) => {
      console.log(resp);
      this.CLIENTS = resp.clients.data; // Respuesta del backend y data parque usamos Collection
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  listConfig(){
    this.clientsService.listConfig().subscribe((resp:any) => {
      console.log(resp);
      this.client_segments = resp.client_segments; // Respuesta del backend      
    })
  }

  loadPage($event:any){
    this.listClients($event);
  }

  createClientCompany() {
    // Inicializo un componente hijo
    const modalRef = this.modalService.open(CreateClientsCompanyComponent,{centered: true, size: 'lg'});

    // Pasar valor x medio de componentes
    // client_segments => nombre de la variable dentro del componente
    modalRef.componentInstance.client_segments = this.client_segments

    // Output
    // Recepcionamos valor enviado por el componente hijo
    modalRef.componentInstance.ClientsC.subscribe((client:any) => {
      this.CLIENTS.unshift(client);
    })
  }

  createClientPerson() {
    // Inicializo un componente hijo
    const modalRef = this.modalService.open(CreateClientsPersonComponent,{centered: true, size: 'lg'});
    // Pasar valor x medio de componentes
    // client_segments => nombre de la variable dentro del componente
    modalRef.componentInstance.client_segments = this.client_segments

    // Output
    // Recepcionamos valor enviado por el componente hijo
    modalRef.componentInstance.ClientsC.subscribe((client:any) => {
      this.CLIENTS.unshift(client);
    })
  }

  editClientCompany(CLIENT_SEGMENT:any){
    const modalRef = this.modalService.open(EditClientsCompanyComponent,{centered: true, size: 'lg'});
    modalRef.componentInstance.CLIENT_SEGMENT_SELECTED = CLIENT_SEGMENT;

    // Output
    modalRef.componentInstance.ClientSegmentE.subscribe((client_segment:any) => {
      let INDEX =  this.CLIENTS.findIndex((client_seg:any) => client_seg.id == CLIENT_SEGMENT.id);
      if(INDEX != -1){
        this.CLIENTS[INDEX] = client_segment;
      }
    })
  }

  editClientPerson(CLIENT_SEGMENT:any){
    const modalRef = this.modalService.open(EditClientsPersonComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CLIENT_SEGMENT_SELECTED = CLIENT_SEGMENT;

    // Output
    modalRef.componentInstance.ClientSegmentE.subscribe((client_segment:any) => {
      let INDEX =  this.CLIENTS.findIndex((client_seg:any) => client_seg.id == CLIENT_SEGMENT.id);
      if(INDEX != -1){
        this.CLIENTS[INDEX] = client_segment;
      }
    })
  }

  deleteClient(CLIENT_SEGMENT:any){
    const modalRef = this.modalService.open(DeleteClientsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CLIENT_SEGMENT_SELECTED = CLIENT_SEGMENT;

    // Output
    modalRef.componentInstance.ClientSegmentD.subscribe((client_segment:any) => {
      let INDEX =  this.CLIENTS.findIndex((client_seg:any) => client_seg.id == CLIENT_SEGMENT.id);
      if(INDEX != -1){
        this.CLIENTS.splice(INDEX,1);
      }
    })
  }
}
