import { Component } from '@angular/core';
import { UnitsService } from '../service/units.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUnitsComponent } from '../create-units/create-units.component';
import { EditUnitsComponent } from '../edit-units/edit-units.component';
import { DeleteUnitsComponent } from '../delete-units/delete-units.component';

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.scss']
})
export class ListUnitsComponent {

  UNITS:any = [];
  isLoading$:any;

  constructor(
    public unitsService: UnitsService,
    public modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.unitsService.isLoading$;
    this.listUnits();
  }

  listUnits()
  {
    this.unitsService.listUnits().subscribe((resp:any) => {
      console.log(resp);
      if (resp.success)
      {
        this.UNITS = resp.units;
      }
    });
  }

  createUnit() {
    const modalRef = this.modalService.open(CreateUnitsComponent,{centered: true, size: 'md'});
    // Recepciono variable del modal
    modalRef.componentInstance.UnitC.subscribe((unit:any) => {
      // Agrega al principio de la lista
      this.UNITS.push(unit);
    });
  }

  editUnit(UNIT:any) {
    const modalRef = this.modalService.open(EditUnitsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.UNIT_SELECTED = UNIT;
    modalRef.componentInstance.UnitE.subscribe((Unit:any) => {
      let INDEX = this.UNITS.findIndex((unit:any) => unit.id == UNIT.id);
      if(INDEX != -1) {
        this.UNITS[INDEX] = Unit;
      }
    });
  }

  deleteUnit(UNIT:any) {
    const modalRef = this.modalService.open(DeleteUnitsComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.UNIT_SELECTED = UNIT;
    modalRef.componentInstance.UnitD.subscribe((Unit:any) => {
      let INDEX = this.UNITS.findIndex((unit:any) => unit.id == UNIT.id);
      if(INDEX != -1) {
        this.UNITS.splice(INDEX, 1)        
      }
    });
  }

}
