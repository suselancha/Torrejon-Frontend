import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { WarehousesService } from '../service/warehouses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-warehouses',
  templateUrl: './create-warehouses.component.html',
  styleUrls: ['./create-warehouses.component.scss']
})
export class CreateWarehousesComponent {
  @Output() WarehouseC: EventEmitter<any> = new EventEmitter();

  name:string = '';
  address:string = '';
  phone:string = '';  
  isLoading:any;
  errors:any = {};
  SIDEBAR:any = SIDEBAR;

  constructor(
    public modal: NgbActiveModal,
    public warehousesService: WarehousesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.warehousesService.isLoading$;
  }

  store() {
    
    let data = {
      name: this.name,
      address: this.address,
      phone: this.phone
    };

    this.warehousesService.registerWarehouse(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.WarehouseC.emit(resp.warehouse);
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