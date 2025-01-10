import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { BanksService } from '../service/banks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-banks',
  templateUrl: './delete-banks.component.html',
  styleUrls: ['./delete-banks.component.scss']
})
export class DeleteBanksComponent {
  @Output() BankD: EventEmitter<any> = new EventEmitter();
  @Input() BANK_SELECTED:any;

  isLoading:any;
  SIDEBAR:any = SIDEBAR;

  name:string = '';

  constructor(
    public modal: NgbActiveModal,
    public banksService: BanksService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.banksService.isLoading$;    
  }

  delete() {
    this.banksService.deleteBank(this.BANK_SELECTED.id).subscribe((resp:any) => {
      console.log(resp);
      if (resp.status != 200) {
        this.toast.error("Validación", resp.message);
      }
      else {
        this.toast.success("Exito", resp.message);
        this.BankD.emit(resp.bank);
        this.modal.close();
      }
    });
  }
}

