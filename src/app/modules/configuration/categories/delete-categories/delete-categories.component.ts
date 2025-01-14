import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../service/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-categories',
  templateUrl: './delete-categories.component.html',
  styleUrls: ['./delete-categories.component.scss']
})
export class DeleteCategoriesComponent {
  @Output() CategoryD: EventEmitter<any> = new EventEmitter();  
  @Input() CATEGORY_SELECTED:any;

  isLoading$:any;

  name:string = '';
  description:string = '';

  constructor(
    public modal: NgbActiveModal,
    public categoriesService: CategoriesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.categoriesService.isLoading$;
  }

  delete() {
    this.categoriesService.deleteCategory(this.CATEGORY_SELECTED.id).subscribe((resp:any) => {
      //console.log(resp);
      if(resp.success) {
        this.toast.success("Exito", resp.message);
        this.CategoryD.emit(resp.category);
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