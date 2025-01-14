import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../configuration/categories/service/categories.service';
import { SubcategoriesService } from '../../configuration/subcategories/service/subcategories.service';
import { WarehousesService } from '../../warehouses/service/warehouses.service';
import { ProvidersService } from '../../providers/service/providers.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent {
  @Output() ProductC: EventEmitter<any> = new EventEmitter();

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

    this.productsService.registerProduct(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.ProductC.emit(resp.product);
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