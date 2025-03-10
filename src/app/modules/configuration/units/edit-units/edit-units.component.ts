import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { UnitsService } from '../service/units.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-units',
  templateUrl: './edit-units.component.html',
  styleUrls: ['./edit-units.component.scss']
})
export class EditUnitsComponent {

  @Output() UnitE: EventEmitter<any> = new EventEmitter();
  @Input() UNIT_SELECTED:any;

  isLoading:any;
  SIDEBAR:any = SIDEBAR;

  name:string = '';
  errors:any = {};

  constructor(
    public modal: NgbActiveModal,
    public unitsService: UnitsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.name = this.UNIT_SELECTED.name;
  }

  store() {
    
    let data = {
      name: this.name,
    }

    this.unitsService.updateUnit(this.UNIT_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.UnitE.emit(resp.unit);
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