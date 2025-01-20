import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ZonaService } from '../service/zona.service';
import { RegionsService } from '../../regions/service/regions.service';


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
  region_id:string = '';
  isLoading:any;
  errors:any = {};

  REGIONS:any = [];

  constructor(
    public modal: NgbActiveModal,
    public toast: ToastrService,
    public zonasService : ZonaService
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.zonasService.isLoading$;
    this.configAll();
  }

  configAll(){
    this.zonasService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.REGIONS = resp.regions;
    })
  }
  
  store(){
    if(!this.name){
      this.toast.error("Validación","El nombre de la zona es requerido");
      return false;
    }

    let data = {
      name: this.name,
      location: this.location,
      description: this.description,
      region_id: this.region_id
    }

    this.zonasService.registerZona(data).subscribe((resp:any) => {
      console.log(resp);
      if (resp.success) {
        this.toast.success("Exito", resp.message);
        this.ZonaC.emit(resp.zona); // Respuesta del backend
        this.modal.close();
      }
      else if(!resp.success) {
        this.errors = resp.data;
      }
    })
  }

}
