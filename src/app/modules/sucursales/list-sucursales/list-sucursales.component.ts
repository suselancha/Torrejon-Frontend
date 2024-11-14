import { Component } from '@angular/core';
import { SucursalesService } from '../service/sucursales.service';

@Component({
  selector: 'app-list-sucursales',
  templateUrl: './list-sucursales.component.html',
  styleUrls: ['./list-sucursales.component.scss']
})
export class ListSucursalesComponent {
  search: string = '';
  zona_id:string = '';

  SUCURSALES: any;
  LISTADO_ZONAS:any = [];

  isLoading$: any;

  totalPages: number = 0;
  currentPage: number = 1;

  constructor(
    public sucursalesService: SucursalesService
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.sucursalesService.isLoading$;
    this.listSucursales();
    this.listConfig();
  }

  listConfig() {
    this.sucursalesService.configAll().subscribe((resp: any) => {
      //console.log(resp);      
      this.LISTADO_ZONAS = resp.zonas; // Respuesta del backend      
    })
  }

  resetlistSucursales() {
    this.search = '';
    this.zona_id = '';
    this.listSucursales();
  }

  listSucursales(page = 1) {
    let data = {
      search: this.search,
      zona_id: this.zona_id,
    }
    this.sucursalesService.listSucursales(page, data).subscribe((resp: any) => {
      console.log(resp);
      this.SUCURSALES = resp.sucursales.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event: any) {
    this.listSucursales($event);
  }

  createSucursal() {

  }

  editSucursal(SUCURSAL: any) {

  }

  deleteSucursal(SUCURSAL: any) {

  }

}
