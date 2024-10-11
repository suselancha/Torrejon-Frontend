import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ZonaService } from '../service/zona.service';


@Component({
  selector: 'app-create-zona',
  templateUrl: './create-zona.component.html',
  styleUrls: ['./create-zona.component.scss']
})
export class CreateZonaComponent {

  @Output() ZonaC: EventEmitter<any> = new EventEmitter();
  name:string = '';
  location:string = '';
  description:string = '';
  isLoading:any;

  constructor(
    public modal: NgbActiveModal,
    public toast: ToastrService,
    public zonaService : ZonaService,
  ) {

  }

  ngOnInit(): void {
    
  }

  store(){
    if(!this.name){
      this.toast.error("Validación","El nombre de la zona es requerido");
      return false;
    }

    let data = {
      name: this.name,
      location: this.location,
      description: this.description
    }

    this.zonaService.registerZona(data).subscribe((resp:any) => {
      console.log(resp);
      // Validamos el error del controlador Laravel
      if(resp.message == 403){
        this.toast.error("Validación",resp.message_text);        
      }else{
        this.toast.success("Éxito","La zona se registró corrrectamente");        
        this.ZonaC.emit(resp.zona); // Respuesta del backend
        this.modal.close();
      }
    })
  }

}
