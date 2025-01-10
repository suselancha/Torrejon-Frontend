import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';
import { BanksService } from '../service/banks.service';

@Component({
  selector: 'app-edit-banks',
  templateUrl: './edit-banks.component.html',
  styleUrls: ['./edit-banks.component.scss']
})
export class EditBanksComponent {

  @Output() BankE: EventEmitter<any> = new EventEmitter();
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
    this.name = this.BANK_SELECTED.name;    
  }

  store() {
    
    let data = {
      name: this.name
    }

    this.banksService.updateBank(this.BANK_SELECTED.id, data).subscribe((resp:any) => {
      console.log(resp);
      if (resp.status != 200) {
        this.toast.error("Error", resp.message);
      }
      else {
        this.toast.success("Exito", resp.message);
        this.BankE.emit(resp.bank); // Respuesta exitos del backend
        this.modal.close();
      }
    });
  }
}
