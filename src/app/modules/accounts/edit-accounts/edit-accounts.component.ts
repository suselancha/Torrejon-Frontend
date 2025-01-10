import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from '../service/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { BanksService } from '../../configuration/banks/service/banks.service';

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

  BANKS:any = [];
  bank_id: string = '';
  
  isLoading$:any;
  errors:any = {};

  constructor(
    public modal: NgbActiveModal,
    public accountsService: AccountsService,
    public banksService: BanksService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {    
    this.isLoading$ = this.accountsService.isLoading$;
    this.name = this.ACCOUNT_SELECTED.name;
    this.bank_id = this.ACCOUNT_SELECTED.bank_id;
    this.alias = this.ACCOUNT_SELECTED.alias;
    this.number = this.ACCOUNT_SELECTED.number;
    this.ubc = this.ACCOUNT_SELECTED.ubc;
    this.listBanks();
  }

  listBanks(){
    this.banksService.listBanks().subscribe((resp: any) => {
      this.BANKS = resp.banks;
    });
  }

  store() {

    let data = {
      name: this.name,
      bank_id: this.bank_id,
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
