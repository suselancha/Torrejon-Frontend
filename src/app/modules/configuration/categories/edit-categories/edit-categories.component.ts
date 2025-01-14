import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { CategoriesService } from '../service/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent {

  @Output() CategoryE: EventEmitter<any> = new EventEmitter();
  @Input() CATEGORY_SELECTED:any;

  isLoading:any;
  SIDEBAR:any = SIDEBAR;

  name:string = '';
  description:string = '';
  errors:any = {};

  constructor(
    public modal: NgbActiveModal,
    public categoriesService: CategoriesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.name = this.CATEGORY_SELECTED.name;
    this.description = this.CATEGORY_SELECTED.description;
  }

  store() {
    
    let data = {
      name: this.name,
      description: this.description
    }

    this.categoriesService.updateCategory(this.CATEGORY_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.CategoryE.emit(resp.category);
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

