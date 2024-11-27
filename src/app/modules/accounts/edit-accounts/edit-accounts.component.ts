import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from '../service/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-accounts',
  templateUrl: './edit-accounts.component.html',
  styleUrls: ['./edit-accounts.component.scss']
})
export class EditAccountsComponent {
  @Output() AccountE: EventEmitter<any> = new EventEmitter();
  @Input() ACCOUNT_SELECTED:any;
  @Input() ACCOUNTABLE_SELECTED:any;

  name:string = '';
  bank:string = '';
  alias:string = '';
  number:string = '';
  ubc:string = '';
  accountable_type:string = '';
  accountable_id:string = '0';
  
  isLoading$:any;
  errors:any = {};

  constructor(
    public modal: NgbActiveModal,
    public accountsService: AccountsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {    
    this.isLoading$ = this.accountsService.isLoading$;
    this.name = this.ACCOUNT_SELECTED.name;
    this.bank = this.ACCOUNT_SELECTED.bank;
    this.alias = this.ACCOUNT_SELECTED.alias;
    this.number = this.ACCOUNT_SELECTED.number;
    this.ubc = this.ACCOUNT_SELECTED.ubc;
  }

  store() {

    let data = {
      name: this.name,
      bank: this.bank,
      alias: this.alias,
      number: this.number,
      ubc: this.ubc
    }

    console.log(data);

    this.accountsService.updateAccount(this.ACCOUNT_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if (resp.success) {
        this.toast.success("Exito", resp.message);
        this.AccountE.emit(resp.account);
        this.modal.close();
      }
      else if(!resp.success) {
        this.errors = resp.data;
      }
      
    });

  }
}
