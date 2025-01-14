import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { CreateProductsComponent } from '../create-products/create-products.component';
import { EditProductsComponent } from '../edit-products/edit-products.component';
import { DeleteProductsComponent } from '../delete-products/delete-products.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {
  
  search:string = '';
  PRODUCTS:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public productsService: ProductsService,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.productsService.isLoading$;
    this.listProducts();
  }

  resetlistProducts(){
    this.search = '';    
    this.listProducts();
  }

  listProducts(page=1) {
    this.productsService.listProducts(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.PRODUCTS = resp.products;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event:any) {
    this.listProducts($event);
  }

  createProduct() {
    const modalRef = this.modalService.open(CreateProductsComponent,{centered: true, size: 'md'});
    // Recepciono variable del modal
    modalRef.componentInstance.ProductC.subscribe((product:any) => {
      // Agrega al principio de la lista
      this.PRODUCTS.push(product);
    });
  }

  editProduct(PRODUCT:any) {
    const modalRef = this.modalService.open(EditProductsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.PRODUCT_SELECTED = PRODUCT;
    modalRef.componentInstance.ProductE.subscribe((Product:any) => {
      let INDEX = this.PRODUCTS.findIndex((product:any) => product.id == PRODUCT.id);
      if(INDEX != -1) {
        this.PRODUCTS[INDEX] = Product;
      }
    });
  }

  deleteProduct(PRODUCT:any) {
    const modalRef = this.modalService.open(DeleteProductsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.PRODUCT_SELECTED = PRODUCT;
    modalRef.componentInstance.ProductD.subscribe((Product:any) => {
      let INDEX = this.PRODUCTS.findIndex((product:any) => product.id == PRODUCT.id);
      if(INDEX != -1) {
        this.PRODUCTS.splice(INDEX, 1)        
      }
    });
  }

}
