import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StocksService } from '../service/stocks.service';
import { Router } from '@angular/router';
import { ShowStocksComponent } from '../show-stocks/show-stocks.component';
import { IncreaseStocksComponent } from '../increase-stocks/increase-stocks.component';
import { DecreaseStocksComponent } from '../decrease-stocks/decrease-stocks.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-stocks',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list-stocks.component.scss'],
})
export class ListStocksComponent {
  
  search:string = '';
  PRODUCTS:any = [];
  WAREHOUSES:any = [];
  PERSONS:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public stocksService: StocksService,
    public router: Router,
    public toast: ToastrService
  ) {
  }
  
  ngOnInit(): void {
    this.isLoading$ = this.stocksService.isLoading$;
    this.listStocks();
  }

  resetlistStocks(){
    this.search = '';    
    this.listStocks();
  }

  listStocks(page=1) {
    this.stocksService.listStocks(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.PRODUCTS = resp.products;
      this.WAREHOUSES = resp.warehouses;
      this.PERSONS = resp.persons;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event:any) {
    this.listStocks($event);
  }

  increase(PRODUCT:any)
  {
    const modalRef = this.modalService.open(IncreaseStocksComponent,{centered: true, size: 'lg'});

    const modalData = {
      PRODUCT_SELECTED : PRODUCT,
      WAREHOUSES : this.WAREHOUSES,
      PERSONS : this.PERSONS
    }

    Object.assign(modalRef.componentInstance, modalData);

    modalRef.componentInstance.ProductE.subscribe((Product:any) => {
      console.log(Product);
      let INDEX = this.PRODUCTS.findIndex((product:any) => product.id == PRODUCT.id);
      if(INDEX != -1) {        
        console.log(this.PRODUCTS[INDEX]);
        this.PRODUCTS[INDEX].stock = Product.stock;
      }
    });
  }

  decrease(PRODUCT:any)
  {
    if (PRODUCT.stock > 0)
    {      
      const modalRef = this.modalService.open(DecreaseStocksComponent,{centered: true, size: 'lg'});
  
      const modalData = {
        PRODUCT_SELECTED : PRODUCT,
        WAREHOUSES : this.WAREHOUSES,
        PERSONS : this.PERSONS
      }
  
      Object.assign(modalRef.componentInstance, modalData);
  
      modalRef.componentInstance.ProductE.subscribe((Product:any) => {
        console.log(Product);
        let INDEX = this.PRODUCTS.findIndex((product:any) => product.id == PRODUCT.id);
        if(INDEX != -1) {        
          console.log(this.PRODUCTS[INDEX]);
          this.PRODUCTS[INDEX].stock = Product.stock;
        }
      });
    } else
    {
      this.toast.error("Error", "Producto sin stock");
    }
  }

  showStocks(PRODUCT:any) {
    this.router.navigate(['stocks/show', PRODUCT.product_id]);
  }

}

