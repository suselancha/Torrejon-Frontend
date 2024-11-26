import { Component } from '@angular/core';
import { ProvidersService } from '../service/providers.service';

@Component({
  selector: 'app-lists-providers',
  templateUrl: './lists-providers.component.html',
  styleUrls: ['./lists-providers.component.scss']
})
export class ListsProvidersComponent {
  search:string = '';  

  PROVIDERS:any;  
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(    
    public providersService: ProvidersService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.providersService.isLoading$;
    this.listProviders();
  }

  resetlistProviders(){
    this.search = '';    
    this.listProviders();
  }

  listProviders(page=1) {    
    this.providersService.listProviders(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.PROVIDERS = resp.providers.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event:any) {
    this.listProviders($event);
  } 
  
  deleteProvider(PROVIDER:any) {
    
  }
}
