import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-clients',
  templateUrl: './search-clients.component.html',
  styleUrls: ['./search-clients.component.scss']
})
export class SearchClientsComponent {
  @Input() clientes:any = [];
  
  ngOnInit(): void {
    console.log(this.clientes);
  }

}
