import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from '../service/accounts.service';
import { Router } from '@angular/router';
import { DeleteAccountsComponent } from '../delete-accounts/delete-accounts.component';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.scss']
})
export class ListAccountsComponent {

  search:string = '';
  ACCOUNTS:any;
  clients:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public accountsService: AccountsService,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.accountsService.isLoading$;
    this.listAccounts();
    this.configAll();
    
  }

  resetlistAccounts(){
    this.search = '';    
    this.listAccounts();
  }

  listAccounts(page = 1) {

    this.accountsService.listAccounts(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.ACCOUNTS = resp.accounts;
      this.totalPages = resp.total;
      this.currentPage = page;
    });

  }

  configAll() {
    this.accountsService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.clients = resp.clients;
    });
    
  }

  loadPage($event:any) {
    this.listAccounts($event);
  }

  createAccount() {
    this.router.navigate(['cuentas/create']);
  }

  editAccount(ACCOUNT:any) {
    this.router.navigate(['cuentas/edit', ACCOUNT.id])
  }

  deleteAccount(ACCOUNT:any) {
    const modalRef = this.modalService.open(DeleteAccountsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.ACCOUNT_SELECTED = ACCOUNT;

    modalRef.componentInstance.AccountD.subscribe((user:any) => {
      let INDEX = this.ACCOUNTS.findIndex((account:any) => account.id == ACCOUNT.id);
      if(INDEX != -1) {
        this.ACCOUNTS.splice(INDEX, 1)
      }
      
    });
  }

}
