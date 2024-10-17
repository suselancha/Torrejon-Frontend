import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientSegmentService } from '../service/client-segment.service';
import { CreateClientSegmentComponent } from '../create-client-segment/create-client-segment.component';
import { EditClientSegmentComponent } from '../edit-client-segment/edit-client-segment.component';
import { DeleteClientSegmentComponent } from '../delete-client-segment/delete-client-segment.component';

@Component({
  selector: 'app-list-client-segment',
  templateUrl: './list-client-segment.component.html',
  styleUrls: ['./list-client-segment.component.scss']
})
export class ListClientSegmentComponent {

  search:string = '';
  CLIENT_SEGMENTS:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public clientSegmentService : ClientSegmentService,
  ) {

  }

  ngOnInit(): void {
    // Renderizado del servicio con el componente
    this.isLoading$ = this.clientSegmentService.isLoading$;
    this.listClientSegments();
  }

  listClientSegments(page = 1){
    this.clientSegmentService.listClientSegments(page,this.search).subscribe((resp:any) => {
      console.log(resp);
      this.CLIENT_SEGMENTS = resp.client_segments; // Respuesta del backend
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  loadPage($event:any){
    this.listClientSegments($event);
  }

  createClientSegment() {
    // Inicializo un componente hijo
    const modalRef = this.modalService.open(CreateClientSegmentComponent,{centered: true, size: 'md'});
    // Output
    // Recepcionamos valor enviado por el componente hijo
    modalRef.componentInstance.ClientSegmentC.subscribe((client_segment:any) => {
      this.CLIENT_SEGMENTS.unshift(client_segment);
    })
  }

  editClientSegment(CLIENT_SEGMENT:any){
    const modalRef = this.modalService.open(EditClientSegmentComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CLIENT_SEGMENT_SELECTED = CLIENT_SEGMENT;

    // Output
    modalRef.componentInstance.ClientSegmentE.subscribe((client_segment:any) => {
      let INDEX =  this.CLIENT_SEGMENTS.findIndex((client_seg:any) => client_seg.id == CLIENT_SEGMENT.id);
      if(INDEX != -1){
        this.CLIENT_SEGMENTS[INDEX] = client_segment;
      }
    })
  }

  deleteClientSegment(CLIENT_SEGMENT:any){
    const modalRef = this.modalService.open(DeleteClientSegmentComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CLIENT_SEGMENT_SELECTED = CLIENT_SEGMENT;

    // Output
    modalRef.componentInstance.ClientSegmentD.subscribe((client_segment:any) => {
      let INDEX =  this.CLIENT_SEGMENTS.findIndex((client_seg:any) => client_seg.id == CLIENT_SEGMENT.id);
      if(INDEX != -1){
        this.CLIENT_SEGMENTS.splice(INDEX,1);
      }
    })
  }

}
