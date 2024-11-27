import { Component } from '@angular/core';
import { ProvidersService } from '../service/providers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccountsComponent } from '../../accounts/create-accounts/create-accounts.component';
import { ShowAccountsComponent } from '../../accounts/show-accounts/show-accounts.component';

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
    public modalService: NgbModal
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
  
  createAccount(ACCOUNTABLE:any) {
    const modalRef = this.modalService.open(CreateAccountsComponent,{centered: true, size: 'md'});
    // Paso el id del cliente con la variable "CLIENT_SELECTED"
    modalRef.componentInstance.ACCOUNTABLE_SELECTED = ACCOUNTABLE;
    modalRef.componentInstance.ACCOUNTABLE_TYPE = 'provider';
    /* modalRef.componentInstance.ClientC.subscribe((role:any) => {      
    }); */
  }

  showAccounts(PROVIDER:any, ACTION:string) {
    const modalRef = this.modalService.open(ShowAccountsComponent,{centered: true, size: 'md'});
    // Paso el id del cliente con la variable "CLIENT_SELECTED"
    modalRef.componentInstance.ACCOUNTABLE_TYPE = 'provider';
    modalRef.componentInstance.ACCOUNTABLE_ID = PROVIDER.id;
    modalRef.componentInstance.ACCOUNT_ACTION = ACTION;
    /* modalRef.componentInstance.ClientE.subscribe((client:any) => {
    }); */
  }

}
