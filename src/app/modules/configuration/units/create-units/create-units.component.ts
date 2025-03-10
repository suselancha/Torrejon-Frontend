import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { UnitsService } from '../service/units.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-units',
  templateUrl: './create-units.component.html',
  styleUrls: ['./create-units.component.scss']
})
export class CreateUnitsComponent {

  @Output() UnitC: EventEmitter<any> = new EventEmitter();

  name:string = '';
  isLoading:any;
  errors:any = {};
  SIDEBAR:any = SIDEBAR;

  constructor(
    public modal: NgbActiveModal,
    public unitService: UnitsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.unitService.isLoading$;
  }

  store() {
    
    let data = {
      name: this.name,
    };

    this.unitService.registerUnit(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.UnitC.emit(resp.unit);
        this.modal.close();
      }
      else {
          this.errors = resp.data;
      }
    });
    
  }

}