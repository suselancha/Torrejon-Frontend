import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { CategoriesService } from '../../configuration/categories/service/categories.service';
import { SubcategoriesService } from '../../configuration/subcategories/service/subcategories.service';
import { WarehousesService } from '../../warehouses/service/warehouses.service';
import { ProvidersService } from '../../providers/service/providers.service';
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent {
  @Output() ProductE: EventEmitter<any> = new EventEmitter();
  @Input() PRODUCT_SELECTED:any;

  code:string = '';
  name:string = '';
  description:string = '';
  category_id:string = '';
  subcategory_id:string = '';
  warehouse_id:string = '';
  provider_id:string = '';
  isLoading:any;
  errors:any = {};
  SIDEBAR:any = SIDEBAR;

  CATEGORIES: any = [];
  SUBCATEGORIES: any = [];
  SUBCATEGORIES_SELECTED: any = [];
  WAREHOUSES: any = [];
  PROVIDERS: any = [];

  constructor(
    public modal: NgbActiveModal,
    public categoriesService: CategoriesService,
    public subcategoriesService: SubcategoriesService,
    public warehousesService: WarehousesService,
    public providersService: ProvidersService,
    public productsService: ProductsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.productsService.isLoading$;
    
    this.configAll();

    this.productsService.getProduct(this.PRODUCT_SELECTED.id).subscribe((resp:any) => {
      this.PRODUCT_SELECTED = resp.product;
      console.log(this.PRODUCT_SELECTED);
      this.code = this.PRODUCT_SELECTED.code;
      this.name = this.PRODUCT_SELECTED.name;
      this.description = this.PRODUCT_SELECTED.description;
      this.category_id = this.PRODUCT_SELECTED.category_id;
      this.subcategory_id = this.PRODUCT_SELECTED.subcategory_id;
      this.warehouse_id = this.PRODUCT_SELECTED.warehouse_id;
      this.provider_id = this.PRODUCT_SELECTED.provider_id;
      this.changeCategory({target:{value: this.PRODUCT_SELECTED.category_id}});
    });
    
  }

  configAll() {
    this.productsService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.CATEGORIES = resp.categories;
      this.SUBCATEGORIES = resp.subcategories;
      this.WAREHOUSES = resp.warehouses;
      this.PROVIDERS = resp.providers;
    });    
  }

  changeCategory($event:any){
    console.log($event.target.value);
    let CATEGORY_ID = $event.target.value;
    let CATEGORY_SELECTED = this.CATEGORIES.find((category:any) => category.id ==  CATEGORY_ID);
    if(CATEGORY_SELECTED){
      this.category_id = CATEGORY_SELECTED.id;
    }
    let subcategories = this.SUBCATEGORIES.filter((subcategory:any) => subcategory.category_id == CATEGORY_ID);
    console.log(subcategories);
    this.SUBCATEGORIES_SELECTED = subcategories;
  }

  store() {
    
    let data = {
      code: this.code,
      name: this.name,
      description: this.description,
      category_id: this.category_id,
      subcategory_id: this.subcategory_id,
      warehouse_id: this.warehouse_id,
      provider_id: this.provider_id
    };

    this.productsService.updateProduct(this.PRODUCT_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.ProductE.emit(resp.product);
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