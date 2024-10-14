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

  totalPages:number = 0;
  currentPage:number = 0;

  constructor(
    public modalService: NgbModal,
    public clientService : ClientsService,
  ) {

  }

  ngOnInit(): void {
    // Renderizado del servicio con el componente
    this.isLoading$ = this.clientService.isLoading$;
    this.listClients();
  }

  listClients(page = 1){
    this.clientService.listClients(page,this.search).subscribe((resp:any) => {
      console.log(resp);
      this.CLIENTS = resp.client_segments; // Respuesta del backend
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  loadPage($event:any){
    this.listClients($event);
  }

  createClientCompany() {
    // Inicializo un componente hijo
    const modalRef = this.modalService.open(CreateClientsCompanyComponent,{centered: true, size: 'md'});
    // Output
    // Recepcionamos valor enviado por el componente hijo
    modalRef.componentInstance.ClientSegmentC.subscribe((client_segment:any) => {
      this.CLIENTS.unshift(client_segment);
    })
  }

  createClientPerson() {
    // Inicializo un componente hijo
    const modalRef = this.modalService.open(CreateClientsPersonComponent,{centered: true, size: 'md'});
    // Output
    // Recepcionamos valor enviado por el componente hijo
    modalRef.componentInstance.ClientSegmentC.subscribe((client_segment:any) => {
      this.CLIENTS.unshift(client_segment);
    })
  }

  editClientCompany(CLIENT_SEGMENT:any){
    const modalRef = this.modalService.open(EditClientsCompanyComponent,{centered: true, size: 'md'});
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
