import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StocksService } from '../service/stocks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-decrease-stocks',
  templateUrl: './decrease-stocks.component.html',
  styleUrls: ['./decrease-stocks.component.scss']
})
export class DecreaseStocksComponent {
  @Output() ProductE: EventEmitter<any> = new EventEmitter();
  @Input() PRODUCT_SELECTED:any;
  @Input() WAREHOUSES:any;
  @Input() PERSONS:any;

  product_id:string = '';
  product_name:string = '';
  product_code:string = '';
  warehouse_id:string = '';
  quantity:string = '';
  description:string = '';
  personable_type:string = '';
  personable_id:string = '';
  isLoading:boolean = false;
  errors:any = {};

  constructor(
    public modal: NgbActiveModal,
    public stocksService: StocksService,
    public toast: ToastrService
  ) {
  }
  
  ngOnInit(): void {    
    this.product_id = this.PRODUCT_SELECTED.product_id
  }

  onPersonChange()
  {
    if (this.personable_id){      
      const person = this.PERSONS.find((person:any) => person.id === this.personable_id);
      this.personable_type = person.type;
      console.log(`personable_id: ${this.personable_id} - personable_type: ${this.personable_type}`);
    }
  }

  onQuantityChange()
  {
    let quantity = parseInt(this.quantity);
    if (quantity > parseInt(this.PRODUCT_SELECTED.stock) && (quantity > 0))
    {            
      this.toast.error("Error", "La cantidad a extraer debe disminuir");
      this.errors.quantity = ['La cantidad sobrepasa el stock disponible'];      
    }
    else{
      this.errors.quantity = [];
    }
  }

  store()
  {
    let data = {
      quantity: parseInt(this.quantity),
      description: this.description,
      product_id: this.product_id,
      warehouse_id: parseInt(this.warehouse_id),
      personable_id: this.personable_id,
      personable_type: this.personable_type
    }
    console.log(data);

    this.stocksService.decrease(data).subscribe((resp:any) => {
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
