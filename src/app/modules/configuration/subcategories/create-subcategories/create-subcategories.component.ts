import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { SubcategoriesService } from '../service/subcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-subcategories',
  templateUrl: './create-subcategories.component.html',
  styleUrls: ['./create-subcategories.component.scss']
})
export class CreateSubcategoriesComponent {
  @Input() CATEGORY_ID: any;
  @Output() SubcategoryC: EventEmitter<any> = new EventEmitter();

  name:string = '';
  description:string = '';
  isLoading:any;
  errors:any = {};
  SIDEBAR:any = SIDEBAR;

  constructor(
    public modal: NgbActiveModal,
    public subcategoriesService: SubcategoriesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.subcategoriesService.isLoading$;
  }

  store() {
    
    let data = {
      name: this.name,
      description: this.description,
      category_id: this.CATEGORY_ID
    };

    this.subcategoriesService.registerSubcategory(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.SubcategoryC.emit(resp.subcategory);
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