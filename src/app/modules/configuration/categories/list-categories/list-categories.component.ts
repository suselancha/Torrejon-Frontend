import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../service/categories.service';
import { CreateCategoriesComponent } from '../create-categories/create-categories.component';
import { EditCategoriesComponent } from '../edit-categories/edit-categories.component';
import { DeleteCategoriesComponent } from '../delete-categories/delete-categories.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})

export class ListCategoriesComponent {
  
  search:string = '';
  CATEGORIES:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public categoriesService: CategoriesService,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.categoriesService.isLoading$;
    this.listCategories();
  }

  resetlistCategories(){
    this.search = '';    
    this.listCategories();
  }

  listCategories(page=1) {
    this.categoriesService.listCategories(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.CATEGORIES = resp.categories;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event:any) {
    this.listCategories($event);
  }

  createCategory() {
    const modalRef = this.modalService.open(CreateCategoriesComponent,{centered: true, size: 'md'});
    // Recepciono variable del modal
    modalRef.componentInstance.CategoryC.subscribe((category:any) => {
      // Agrega al principio de la lista
      this.CATEGORIES.push(category);
    });
  }

  editCategory(CATEGORY:any) {
    const modalRef = this.modalService.open(EditCategoriesComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CATEGORY_SELECTED = CATEGORY;
    modalRef.componentInstance.CategoryE.subscribe((Category:any) => {
      let INDEX = this.CATEGORIES.findIndex((category:any) => category.id == CATEGORY.id);
      if(INDEX != -1) {
        this.CATEGORIES[INDEX] = Category;
      }
    });
  }

  deleteCategory(CATEGORY:any) {
    const modalRef = this.modalService.open(DeleteCategoriesComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CATEGORY_SELECTED = CATEGORY;
    modalRef.componentInstance.CategoryD.subscribe((Category:any) => {
      let INDEX = this.CATEGORIES.findIndex((category:any) => category.id == CATEGORY.id);
      if(INDEX != -1) {
        this.CATEGORIES.splice(INDEX, 1)        
      }
    });
  }

}
