import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { CategoriesService } from '../service/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent {

  @Output() CategoryC: EventEmitter<any> = new EventEmitter();

  name:string = '';
  description:string = '';
  isLoading:any;
  errors:any = {};
  SIDEBAR:any = SIDEBAR;

  constructor(
    public modal: NgbActiveModal,
    public categoriesService: CategoriesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.categoriesService.isLoading$;
  }

  store() {
    
    let data = {
      name: this.name,
      description: this.description
    };

    this.categoriesService.registerCategory(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.CategoryC.emit(resp.category);
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


