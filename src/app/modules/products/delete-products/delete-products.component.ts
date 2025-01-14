import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.scss']
})
export class DeleteProductsComponent {
  @Output() ProductD: EventEmitter<any> = new EventEmitter();  
  @Input() PRODUCT_SELECTED:any;

  isLoading$:any;

  constructor(
    public modal: NgbActiveModal,
    public productsService: ProductsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.productsService.isLoading$;
  }

  delete() {
    this.productsService.deleteProduct(this.PRODUCT_SELECTED.id).subscribe((resp:any) => {
      //console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.ProductD.emit(resp.product);
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