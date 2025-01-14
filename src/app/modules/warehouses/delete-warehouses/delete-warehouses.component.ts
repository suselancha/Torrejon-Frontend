import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehousesService } from '../service/warehouses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-warehouses',
  templateUrl: './delete-warehouses.component.html',
  styleUrls: ['./delete-warehouses.component.scss']
})
export class DeleteWarehousesComponent {
  @Output() WarehouseD: EventEmitter<any> = new EventEmitter();  
  @Input() WAREHOUSE_SELECTED:any;

  isLoading$:any;

  constructor(
    public modal: NgbActiveModal,
    public warehousesService: WarehousesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.warehousesService.isLoading$;
  }

  delete() {
    this.warehousesService.deleteWarehouse(this.WAREHOUSE_SELECTED.id).subscribe((resp:any) => {
      //console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.WarehouseD.emit(resp.warehouse);
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