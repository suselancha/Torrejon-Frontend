import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountsService } from '../service/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowAccountsComponent } from '../show-accounts/show-accounts.component';

@Component({
  selector: 'app-create-accounts',
  templateUrl: './create-accounts.component.html',
  styleUrls: ['./create-accounts.component.css'],
})
export class CreateAccountsComponent {
  @Input() ACCOUNTABLE_SELECTED:any;
  @Input() ACCOUNTABLE_TYPE:any;

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
    public modalService: NgbModal,
    public accountsService: AccountsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {    
    this.isLoading$ = this.accountsService.isLoading$;
    this.accountable_id = this.ACCOUNTABLE_SELECTED.id;
    this.accountable_type = this.ACCOUNTABLE_TYPE;
  }

  store() {

    let data = {
      name: this.name,
      bank: this.bank,
      alias: this.alias,
      number: this.number,
      ubc: this.ubc,
      accountable_type: this.accountable_type,
      accountable_id: this.accountable_id
    }

    console.log(data);

    this.accountsService.registerAccount(data).subscribe((resp:any) => {
      console.log(resp);
      if (resp.success) {
        this.toast.success("Exito", resp.message);
        this.modal.close();
        const modalRef = this.modalService.open(ShowAccountsComponent,{centered: true, size: 'md'});
        // Paso el id del cliente con la variable "CLIENT_SELECTED"
        modalRef.componentInstance.ACCOUNTABLE_TYPE = this.accountable_type;
        modalRef.componentInstance.ACCOUNTABLE_ID = this.accountable_id;
        modalRef.componentInstance.ACCOUNT_ACTION = 'VIEW';
      }
      else if(!resp.success) {
        this.errors = resp.data;
      }
      
    });

  }
}