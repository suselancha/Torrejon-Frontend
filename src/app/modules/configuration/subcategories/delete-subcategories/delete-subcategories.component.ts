import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { SubcategoriesService } from '../service/subcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-subcategories',
  templateUrl: './delete-subcategories.component.html',
  styleUrls: ['./delete-subcategories.component.scss']
})
export class DeleteSubcategoriesComponent {
  @Input() CATEGORY_ID: any;
  @Input() SUBCATEGORY_SELECTED: any;
  @Output() SubcategoryD: EventEmitter<any> = new EventEmitter();

  name:string = '';
  description:string = '';
  isLoading$:any;
  errors:any = {};
  SIDEBAR:any = SIDEBAR;

  constructor(
    public modal: NgbActiveModal,
    public subcategoriesService: SubcategoriesService,
    public toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.subcategoriesService.isLoading$;
  }

  delete() {    
    this.subcategoriesService.deleteSubcategory(this.SUBCATEGORY_SELECTED.id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.SubcategoryD.emit(resp.subcategory);
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

