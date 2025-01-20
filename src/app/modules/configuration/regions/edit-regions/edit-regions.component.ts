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

  @Output() RegionE: EventEmitter<any> = new EventEmitter();
  @Input() REGION_SELECTED:any;

  isLoading:any;
  SIDEBAR:any = SIDEBAR;

  name:string = '';
  description:string = '';
  errors:any = {};

  constructor(
    public modal: NgbActiveModal,
    public regionsService: RegionsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.name = this.REGION_SELECTED.name;
    this.description = this.REGION_SELECTED.description;
  }

  store() {
    
    let data = {
      name: this.name,
      description: this.description
    }

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

