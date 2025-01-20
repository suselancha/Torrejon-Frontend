import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RegionsService } from '../service/regions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-regions',
  templateUrl: './create-regions.component.html',
  styleUrls: ['./create-regions.component.scss']
})
export class CreateRegionsComponent {

  @Output() RegionC: EventEmitter<any> = new EventEmitter();

  name:string = '';
  description:string = '';
  isLoading:any;
  errors:any = {};
  SIDEBAR:any = SIDEBAR;

  constructor(
    public modal: NgbActiveModal,
    public regionsService: RegionsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.regionsService.isLoading$;
  }

  store() {
    
    let data = {
      name: this.name,
      description: this.description
    };

    this.regionsService.registerRegion(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.RegionC.emit(resp.region);
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


