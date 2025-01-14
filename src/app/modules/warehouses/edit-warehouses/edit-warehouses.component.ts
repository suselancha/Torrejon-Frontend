import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { WarehousesService } from '../service/warehouses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-warehouses',
  templateUrl: './edit-warehouses.component.html',
  styleUrls: ['./edit-warehouses.component.scss']
})
export class EditWarehousesComponent {
  @Output() WarehouseE: EventEmitter<any> = new EventEmitter();
  @Input() WAREHOUSE_SELECTED:any;

  isLoading:any;
  SIDEBAR:any = SIDEBAR;

  name:string = '';
  address:string = '';
  phone:string = '';
  errors:any = {};

  constructor(
    public modal: NgbActiveModal,
    public warehousesService: WarehousesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.name = this.WAREHOUSE_SELECTED.name;
    this.address = this.WAREHOUSE_SELECTED.address;
    this.phone = this.WAREHOUSE_SELECTED.phone;
  }

  store() {
    
    let data = {
      name: this.name,
      address: this.address,
      phone: this.phone
    }

    this.warehousesService.updateWarehouse(this.WAREHOUSE_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.WarehouseE.emit(resp.warehouse);
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

