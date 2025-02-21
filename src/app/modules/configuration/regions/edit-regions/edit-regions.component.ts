import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RegionsService } from '../service/regions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-regions',
  templateUrl: './edit-regions.component.html',
  styleUrls: ['./edit-regions.component.scss']
})
export class EditRegionsComponent {
  @Input() REGION_SELECTED:any;
  @Input() ZONAS:any;
  @Output() RegionE: EventEmitter<any> = new EventEmitter();

  isLoading:any;
  SIDEBAR:any = SIDEBAR;

  name:string = '';
  description:string = '';
  errors:any = {};
  zonas: any=[];

  constructor(
    public modal: NgbActiveModal,
    public regionsService: RegionsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.name = this.REGION_SELECTED.name;
    this.description = this.REGION_SELECTED.description;
    this.zonas = this.REGION_SELECTED.zonas.map((zona:any) => zona.id);
    console.log(this.zonas);
  }

  store() {
    
    let data = {
      name: this.name,
      description: this.description,
      zonas: this.zonas,
    }
    console.log(data);
    this.regionsService.updateRegion(this.REGION_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.RegionE.emit(resp.region);
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

