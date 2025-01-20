import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionsService } from '../service/regions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-regions',
  templateUrl: './delete-regions.component.html',
  styleUrls: ['./delete-regions.component.scss']
})
export class DeleteRegionsComponent {
  
  @Output() RegionD: EventEmitter<any> = new EventEmitter();  
  @Input() REGION_SELECTED:any;

  isLoading$:any;

  name:string = '';
  description:string = '';

  constructor(
    public modal: NgbActiveModal,
    public regionsService: RegionsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.regionsService.isLoading$;
  }

  delete() {
    this.regionsService.deleteRegion(this.REGION_SELECTED.id).subscribe((resp:any) => {
      //console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.RegionD.emit(resp.region);
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