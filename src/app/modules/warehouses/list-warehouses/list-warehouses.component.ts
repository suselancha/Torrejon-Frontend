import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehousesService } from '../service/warehouses.service';
import { Router } from '@angular/router';
import { CreateWarehousesComponent } from '../create-warehouses/create-warehouses.component';
import { EditWarehousesComponent } from '../edit-warehouses/edit-warehouses.component';
import { DeleteWarehousesComponent } from '../delete-warehouses/delete-warehouses.component';

@Component({
  selector: 'app-list-warehouses',
  templateUrl: './list-warehouses.component.html',
  styleUrls: ['./list-warehouses.component.scss']
})
export class ListWarehousesComponent {
  
  search:string = '';
  WAREHOUSES:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public warehousesService: WarehousesService,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.warehousesService.isLoading$;
    this.listWarehouses();
  }

  resetlistWarehouses(){
    this.search = '';    
    this.listWarehouses();
  }

  listWarehouses(page=1) {
    this.warehousesService.listWarehouses(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.WAREHOUSES = resp.warehouses;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event:any) {
    this.listWarehouses($event);
  }

  createWarehouse() {
    const modalRef = this.modalService.open(CreateWarehousesComponent,{centered: true, size: 'md'});
    // Recepciono variable del modal
    modalRef.componentInstance.WarehouseC.subscribe((warehouse:any) => {
      // Agrega al principio de la lista
      this.WAREHOUSES.push(warehouse);
    });
  }

  editWarehouse(WAREHOUSE:any) {
    const modalRef = this.modalService.open(EditWarehousesComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.WAREHOUSE_SELECTED = WAREHOUSE;
    modalRef.componentInstance.WarehouseE.subscribe((Warehouse:any) => {
      let INDEX = this.WAREHOUSES.findIndex((warehouse:any) => warehouse.id == WAREHOUSE.id);
      if(INDEX != -1) {
        this.WAREHOUSES[INDEX] = Warehouse;
      }
    });
  }

  deleteWarehouse(WAREHOUSE:any) {
    const modalRef = this.modalService.open(DeleteWarehousesComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.WAREHOUSE_SELECTED = WAREHOUSE;
    modalRef.componentInstance.WarehouseD.subscribe((Warehouse:any) => {
      let INDEX = this.WAREHOUSES.findIndex((warehouse:any) => warehouse.id == WAREHOUSE.id);
      if(INDEX != -1) {
        this.WAREHOUSES.splice(INDEX, 1)        
      }
    });
  }

}
