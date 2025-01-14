import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoriesService } from '../service/subcategories.service';
import { ActivatedRoute } from '@angular/router';
import { CreateSubcategoriesComponent } from '../create-subcategories/create-subcategories.component';
import { EditSubcategoriesComponent } from '../edit-subcategories/edit-subcategories.component';
import { DeleteSubcategoriesComponent } from '../delete-subcategories/delete-subcategories.component';

@Component({
  selector: 'app-list-subcategories',
  templateUrl: './list-subcategories.component.html',
  styleUrls: ['./list-subcategories.component.scss']
})
export class ListSubcategoriesComponent {
  
  category_id = '';
  search:string = '';
  SUBCATEGORIES:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public subcategoriesService: SubcategoriesService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.subcategoriesService.isLoading$;
    this.category_id = this.route.snapshot.params['id'];
    this.listSubcategories();
  }

  resetlistSubcategories(){
    this.search = '';    
    this.listSubcategories();
  }

  listSubcategories(page=1) {
    console.log(this.category_id);
    if(!this.category_id) {      
      this.subcategoriesService.listSubcategories(page, this.search).subscribe((resp: any) => {
        console.log(resp);
        this.SUBCATEGORIES = resp.subcategories;
        this.totalPages = resp.total;
        this.currentPage = page;
      });
    }
    else{
      let data = {
        category_id: this.category_id
      }
      this.subcategoriesService.listSubcategoriesFilter(data, page, this.search).subscribe((resp: any) => {
        console.log(resp);
        this.SUBCATEGORIES = resp.subcategories;
        this.totalPages = resp.total;
        this.currentPage = page;
      });
    }

  }

  loadPage($event:any) {
    this.listSubcategories($event);
  }

  createSubcategory() {
    const modalRef = this.modalService.open(CreateSubcategoriesComponent,{centered: true, size: 'md'});
    // Recepciono variable del modal
    modalRef.componentInstance.CATEGORY_ID = this.category_id;
    modalRef.componentInstance.SubcategoryC.subscribe((category:any) => {
      // Agrega al principio de la lista
      this.SUBCATEGORIES.unshift(category);
    });
  }

  editSubcategory(SUBCATEGORY:any) {
    const modalRef = this.modalService.open(EditSubcategoriesComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CATEGORY_ID = this.category_id;
    modalRef.componentInstance.SUBCATEGORY_SELECTED = SUBCATEGORY;
    modalRef.componentInstance.SubcategoryE.subscribe((Subcategory:any) => {
      let INDEX = this.SUBCATEGORIES.findIndex((subcategory:any) => subcategory.id == SUBCATEGORY.id);
      if(INDEX != -1) {
        this.SUBCATEGORIES[INDEX] = Subcategory;
      }
    });
  }

  deleteSubcategory(SUBCATEGORY:any) {
    const modalRef = this.modalService.open(DeleteSubcategoriesComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CATEGORY_ID = this.category_id;    
    modalRef.componentInstance.SUBCATEGORY_SELECTED = SUBCATEGORY;
    modalRef.componentInstance.SubcategoryD.subscribe((Subcategory:any) => {
      let INDEX = this.SUBCATEGORIES.findIndex((subcategory:any) => subcategory.id == SUBCATEGORY.id);
      if(INDEX != -1) {
        this.SUBCATEGORIES.splice(INDEX, 1)        
      }
    });
  }

}

