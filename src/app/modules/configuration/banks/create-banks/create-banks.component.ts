import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { BanksService } from '../service/banks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-banks',
  templateUrl: './create-banks.component.html',
  styleUrls: ['./create-banks.component.scss']
})
export class CreateBanksComponent {
  
  @Output() BankC: EventEmitter<any> = new EventEmitter();

  name:string = '';
  isLoading:any;
  SIDEBAR:any = SIDEBAR;

  constructor(
    public modal: NgbActiveModal,
    public banksService: BanksService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = this.banksService.isLoading$;
  }

  store() {
    
    let data = {
      name: this.name
    };

    this.banksService.registerBank(data).subscribe((resp:any) => {
      console.log(resp);
      if (resp.status == 201) {
        this.toast.success("Exito", resp.message);
        this.BankC.emit(resp.bank); // Respuesta exitos del backend
        this.modal.close();
      }
      else {
        this.toast.error("Validación", resp.message);
      }
    });
    
  }

}

