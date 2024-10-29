import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientSegmentService } from '../service/client-segment.service';

@Component({
  selector: 'app-create-client-segment',
  templateUrl: './create-client-segment.component.html',
  styleUrls: ['./create-client-segment.component.scss']
})
export class CreateClientSegmentComponent {

  @Output() ClientSegmentC: EventEmitter<any> = new EventEmitter();
  name:string = '';
  isLoading:any;

  constructor(
    public modal: NgbActiveModal,
    public toast: ToastrService,
    public clientSegmentService : ClientSegmentService,
  ) {

  }

  ngOnInit(): void {
    
  }

  store(){
    if(!this.name){
      this.toast.error("Validación","El nombre del segmento es requerido");
      return false;
    }

    let data = {
      name: this.name
    }

    this.clientSegmentService.registerClientSegment(data).subscribe((resp:any) => {
      console.log(resp);
      // Validamos el error del controlador Laravel
      if(resp.message == 403){
        this.toast.error("Validación",resp.message_text);        
      }else{
        this.toast.success("Éxito","Tipo de cliente registrado corrrectamente");        
        this.ClientSegmentC.emit(resp.client_segment); // Respuesta del backend
        this.modal.close();
      }
    })
  }
}
