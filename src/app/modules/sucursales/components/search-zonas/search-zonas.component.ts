import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-zonas',
  templateUrl: './search-zonas.component.html',
  styleUrls: ['./search-zonas.component.scss']
})
export class SearchZonasComponent {
  @Input() zonas:any = [];
  
  ngOnInit(): void {
    console.log(this.zonas);
  }
}
