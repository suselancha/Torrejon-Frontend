import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { SubcategoriesService } from '../service/subcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-subcategories',
  templateUrl: './edit-subcategories.component.html',
  styleUrls: ['./edit-subcategories.component.scss']
})
export class EditSubcategoriesComponent {
  @Input() CATEGORY_ID: any;
  @Input() SUBCATEGORY_SELECTED: any;
  @Output() SubcategoryE: EventEmitter<any> = new EventEmitter();

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
    this.name = this.SUBCATEGORY_SELECTED.name;
    this.description = this.SUBCATEGORY_SELECTED.description;
  }

  store() {    
    let data = {
      name: this.name,
      description: this.description,
      category_id: this.CATEGORY_ID
    };

    this.subcategoriesService.updateSubcategory(this.SUBCATEGORY_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.SubcategoryE.emit(resp.subcategory);
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
