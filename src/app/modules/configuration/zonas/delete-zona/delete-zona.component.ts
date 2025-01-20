import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZonaService } from '../service/zona.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-zona',
  templateUrl: './delete-zona.component.html',
  styleUrls: ['./delete-zona.component.scss']
})
export class DeleteZonaComponent {
  @Output() ZonaD: EventEmitter<any> = new EventEmitter();  
  @Input() ZONA_SELECTED:any;

  isLoading$:any;

  constructor(
    public modal: NgbActiveModal,
    public zonaService: ZonaService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.zonaService.isLoading$;
  }

  delete() {
    this.zonaService.deleteZona(this.ZONA_SELECTED.id).subscribe((resp:any) => {
      //console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.ZonaD.emit(resp.zona);
        this.modal.close();
      }
      else{
        console.log(resp);
        this.toast.error("Error", resp.message);
        this.modal.close();
      }      
    });
  }
}