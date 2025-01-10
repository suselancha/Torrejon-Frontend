import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BanksService } from '../service/banks.service';
import { CreateBanksComponent } from '../create-banks/create-banks.component';
import { EditBanksComponent } from '../edit-banks/edit-banks.component';
import { DeleteBanksComponent } from '../delete-banks/delete-banks.component';

@Component({
  selector: 'app-list-banks',
  templateUrl: './list-banks.component.html',
  styleUrls: ['./list-banks.component.scss']
})
export class ListBanksComponent {

  search:string = '';
  BANKS:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
    public modalService: NgbModal,
    public banksService: BanksService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.banksService.isLoading$;
    this.listBanks();
  }

  resetlistBanks(){
    this.search = '';    
    this.listBanks();
  }

  listBanks(page=1) {
    this.banksService.listBanks(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.BANKS = resp.banks;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event:any) {
    this.listBanks($event);
  }

  createBank() {
    const modalRef = this.modalService.open(CreateBanksComponent,{centered: true, size: 'md'});
    // Recepciono variable del modal
    modalRef.componentInstance.BankC.subscribe((bank:any) => {
      // Agrega al principio de la lista
      this.BANKS.unshift(bank);
    });
  }

  editBank(BANK:any) {
    const modalRef = this.modalService.open(EditBanksComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.BANK_SELECTED = BANK;
    modalRef.componentInstance.BankE.subscribe((Bank:any) => {
      let INDEX = this.BANKS.findIndex((bank:any) => bank.id == BANK.id);
      if(INDEX != -1) {
        this.BANKS[INDEX] = Bank;
      }
    });
  }

  deleteBank(BANK:any) {
    const modalRef = this.modalService.open(DeleteBanksComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.BANK_SELECTED = BANK;
    modalRef.componentInstance.BankD.subscribe((Bank:any) => {
      let INDEX = this.BANKS.findIndex((bank:any) => bank.id == BANK.id);
      if(INDEX != -1) {
        this.BANKS.splice(INDEX, 1)        
      }
    });
  }

}
