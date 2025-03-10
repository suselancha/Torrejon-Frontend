import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnitsService } from '../service/units.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-units',
  templateUrl: './delete-units.component.html',
  styleUrls: ['./delete-units.component.scss']
})
export class DeleteUnitsComponent {
  @Output() UnitD: EventEmitter<any> = new EventEmitter();  
  @Input() UNIT_SELECTED:any;

  isLoading$:any;

  name:string = '';

  constructor(
    public modal: NgbActiveModal,
    public unitsService: UnitsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.unitsService.isLoading$;
  }

  delete() {
    this.unitsService.deleteUnit(this.UNIT_SELECTED.id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.UnitD.emit(resp.unit);
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