import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { ZonaService } from '../service/zona.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-zona',
  templateUrl: './edit-zona.component.html',
  styleUrls: ['./edit-zona.component.scss']
})
export class EditZonaComponent {
  @Output() ZonaE: EventEmitter<any> = new EventEmitter();
  @Input() ZONA_SELECTED:any;

  name:string = '';
  location:string = '';  
  description:string = '';
  state:string = '';
  region_id:string = '';
  isLoading$:any;
  errors:any = {};
  SIDEBAR:any = SIDEBAR;
  REGIONS:any = [];

  constructor(
    public modal: NgbActiveModal,
    public zonasService: ZonaService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.zonasService.isLoading$;

    this.name = this.ZONA_SELECTED.name;
    this.location = this.ZONA_SELECTED.location;
    this.description = this.ZONA_SELECTED.description;
    this.state = this.ZONA_SELECTED.state;
    this.region_id = this.ZONA_SELECTED.region_id ??= 0;
    this.configAll();
  }

  configAll(){
    this.zonasService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.REGIONS = resp.regions;
    })
  }

  store() {
    
    let data = {
      name: this.name,
      location: this.location,      
      description: this.description,      
      state: this.state,
      region_id: this.region_id,
    };

    this.zonasService.updateZona(this.ZONA_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.ZonaE.emit(resp.zona);
        this.modal.close();
      }
      else {
        if(resp.status === 500){
          this.toast.error("Error", resp.message);
        }
        else {          
          this.errors = resp.data;
        }
      }
    });   
  }
}