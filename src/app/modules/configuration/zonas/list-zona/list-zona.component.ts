import { Component } from '@angular/core';
import { ZonaService } from '../service/zona.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditZonaComponent } from '../edit-zona/edit-zona.component';
import { DeleteZonaComponent } from '../delete-zona/delete-zona.component';
import { CreateZonaComponent } from '../create-zona/create-zona.component';

@Component({
  selector: 'app-list-zona',
  templateUrl: './list-zona.component.html',
  styleUrls: ['./list-zona.component.scss']
})
export class ListZonaComponent {
  search:string = '';
  ZONAS:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public zonaService : ZonaService,
  ) {

  }

  ngOnInit(): void {
    // Renderizado del servicio con el componente
    this.isLoading$ = this.zonaService.isLoading$;
    this.listZonas();
  }

  listZonas(page = 1){
    this.zonaService.listZonas(page,this.search).subscribe((resp:any) => {
      console.log(resp);
      this.ZONAS = resp.zonas; // Respuesta del backend
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  loadPage($event:any){
    this.listZonas($event);
  }

  createZona() {
    // Inicializo un componente hijo
    const modalRef = this.modalService.open(CreateZonaComponent,{centered: true, size: 'md'});
    // Output
    // Recepcionamos valor enviado por el componente hijo
    modalRef.componentInstance.ZonaC.subscribe((client_segment:any) => {
      this.ZONAS.unshift(client_segment);
    })
  }

  editZona(ZONA:any){
    const modalRef = this.modalService.open(EditZonaComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.ZONA_SELECTED = ZONA;

    // Output
    modalRef.componentInstance.ZonaE.subscribe((client_segment:any) => {
      let INDEX =  this.ZONAS.findIndex((client_seg:any) => client_seg.id == ZONA.id);
      if(INDEX != -1){
        this.ZONAS[INDEX] = client_segment;
      }
    })
  }

  deleteZona(ZONA:any){
    const modalRef = this.modalService.open(DeleteZonaComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.ZONA_SELECTED = ZONA;

    // Output
    modalRef.componentInstance.ZonaD.subscribe((client_segment:any) => {
      let INDEX =  this.ZONAS.findIndex((client_seg:any) => client_seg.id == ZONA.id);
      if(INDEX != -1){
        this.ZONAS.splice(INDEX,1);
      }
    })
  }
}
