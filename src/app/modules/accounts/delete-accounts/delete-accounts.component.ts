import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from '../service/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-accounts',
  templateUrl: './delete-accounts.component.html',
  styleUrls: ['./delete-accounts.component.scss']
})
export class DeleteAccountsComponent {
  @Output() AccountD: EventEmitter<any> = new EventEmitter();  
  @Input() ACCOUNT_SELECTED:any;

  isLoading$:any;

  name:string = '';
  permissions:any = [];

  constructor(
    public modal: NgbActiveModal,
    public accountService: AccountsService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.accountService.isLoading$;
  }

  delete() {
    this.accountService.deleteAccount(this.ACCOUNT_SELECTED.id).subscribe((resp:any) => {
      console.log(resp);
      if (resp.status == 200) {
        this.toast.success("Exito", resp.message);
        this.AccountD.emit(resp.account);
        this.modal.close();
      }
      else {      
        this.toast.error("Validación", resp.message_text);
      }
    });
  }

}
