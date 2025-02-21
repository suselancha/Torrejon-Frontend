import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionsService } from '../service/regions.service';
import { Router } from '@angular/router';
import { CreateRegionsComponent } from '../create-regions/create-regions.component';
import { EditRegionsComponent } from '../edit-regions/edit-regions.component';
import { DeleteRegionsComponent } from '../delete-regions/delete-regions.component';

@Component({
  selector: 'app-list-regions',
  templateUrl: './list-regions.component.html',
  styleUrls: ['./list-regions.component.scss']
})

export class ListRegionsComponent {
  
  search:string = '';
  REGIONS:any = [];
  ZONAS:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public regionsService: RegionsService,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.regionsService.isLoading$;
    this.listRegions();
  }

  
  listRegions(page=1) {
    this.regionsService.listRegions(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.REGIONS = resp.regions;
      this.totalPages = resp.total;
      this.currentPage = page;
    });

    this.regionsService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.ZONAS = resp.zonas;
    });
  }
  
  resetListRegions(){
    this.search = '';    
    this.listRegions();
  }
  
  loadPage($event:any) {
    this.listRegions($event);
  }

  createRegion() {
    const modalRef = this.modalService.open(CreateRegionsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.ZONAS = this.ZONAS;
    
    // Recepciono variable del modal
    modalRef.componentInstance.RegionC.subscribe((region:any) => {
      // Agrega al principio de la lista
      this.REGIONS.push(region);
    });
  }

  editRegion(REGION:any) {
    const modalRef = this.modalService.open(EditRegionsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.REGION_SELECTED = REGION;
    modalRef.componentInstance.ZONAS = this.ZONAS;
    
    modalRef.componentInstance.RegionE.subscribe((Region:any) => {
      let INDEX = this.REGIONS.findIndex((region:any) => region.id == REGION.id);
      if(INDEX != -1) {
        this.REGIONS[INDEX] = Region;
      }
    });
  }

  deleteRegion(REGION:any) {
    const modalRef = this.modalService.open(DeleteRegionsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.REGION_SELECTED = REGION;
    modalRef.componentInstance.RegionD.subscribe((Region:any) => {
      let INDEX = this.REGIONS.findIndex((region:any) => region.id == REGION.id);
      if(INDEX != -1) {
        this.REGIONS.splice(INDEX, 1)        
      }
    });
  }

}
