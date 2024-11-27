import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from '../service/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { EditAccountsComponent } from '../edit-accounts/edit-accounts.component';
import { DeleteAccountsComponent } from '../delete-accounts/delete-accounts.component';

@Component({
  selector: 'app-show-accounts',
  templateUrl: './show-accounts.component.html',
  styleUrls: ['./show-accounts.component.scss']
})
export class ShowAccountsComponent {
  @Input() ACCOUNTABLE_TYPE:string;
  @Input() ACCOUNTABLE_ID:number;
  @Input() ACCOUNT_ACTION:string;

  name:string = '';
  bank:string = '';
  alias:string = '';
  number:string = '';
  ubc:string = '';
  accountable_type:string = '';
  accountable_id:string = '0';
  ACCOUNTS:any;
  ACCOUNTABLE:any = {};
  ACCOUNT:any = {};
  
  isLoading$:any;
  errors:any = {};

  constructor(
    public modal: NgbActiveModal,
    public modalService: NgbModal,
    public accountsService: AccountsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {    
    this.isLoading$ = this.accountsService.isLoading$;
    this.listAccounts();
  }

  listAccounts(){    
    let data = { accountable_type: this.ACCOUNTABLE_TYPE, accountable_id: this.ACCOUNTABLE_ID }
    this.accountsService.filterAccounts(data).subscribe((resp:any) => {      
      this.ACCOUNTS = resp.accounts; // Respuesta del backend
      this.ACCOUNTABLE = resp.accountable;
    })
  }

  editAccount(ACCOUNT:any) {
    const modalRef = this.modalService.open(EditAccountsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.ACCOUNT_SELECTED = ACCOUNT;
    modalRef.componentInstance.ACCOUNTABLE_SELECTED = this.ACCOUNTABLE;

    modalRef.componentInstance.AccountE.subscribe((account:any) => {
      let INDEX = this.ACCOUNTS.findIndex((account:any) => account.id == ACCOUNT.id);
      if(INDEX != 1) {
        this.ACCOUNTS[INDEX] = account;
      }
    });
  }



  deleteAccount(ACCOUNT:any) {
    const modalRef = this.modalService.open(DeleteAccountsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.ACCOUNT_SELECTED = ACCOUNT;

    modalRef.componentInstance.AccountD.subscribe((account:any) => {
      let INDEX = this.ACCOUNTS.findIndex((account:any) => account.id == ACCOUNT.id);
      if(INDEX != 1) {
        this.ACCOUNTS.splice(INDEX, 1);
      }
    });
  }
}
