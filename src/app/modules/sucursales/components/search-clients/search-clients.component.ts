import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-clients',
  templateUrl: './search-clients.component.html',
  styleUrls: ['./search-clients.component.scss']
})
export class SearchClientsComponent {
  @Input() clientes:any = [];
  @Output() ClientSelected: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal:NgbActiveModal
  ) {

  }
  
  ngOnInit(): void {
    console.log(this.clientes);
  }

  selectClient(client:any){
    // Emitimos el valor al componente padre
    this.ClientSelected.emit(client);
    this.modal.close();
  }

}
