import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent {
  @Output() RoleE: EventEmitter<any> = new EventEmitter();
  // Recibo del padre en la variable ""
  @Input() ROLE_SELECTED:any;

  isLoading:any;
  SIDEBAR:any = SIDEBAR;

  name:string = '';
  permissions:any = [];

  constructor(
    public modal: NgbActiveModal,
    public rolesService: RolesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.name = this.ROLE_SELECTED.name;
    // Array simple
    this.permissions = this.ROLE_SELECTED.permission_pluck;
    
  }

  addPermission(permiso:string) {
    // Busco si existe el permiso en el array
    let INDEX = this.permissions.findIndex((perm:string) => perm == permiso);
    if (INDEX != -1) { // Elimino
      this.permissions.splice(INDEX, 1);
    }
    else { // Agrego
      this.permissions.push(permiso);
    }
    console.log(this.permissions);
  }

  store() {
    if(!this.name) {
      this.toast.error("Validación", "El nombre es requerido");
      return false;
    }
    if(this.permissions.length == 0) {
      this.toast.error("Validación", "Necesitas seleccionar al menos un permiso.");
      return false;
    }

    let data = {
      name: this.name,
      permissions: this.permissions
    }

    this.rolesService.updateRole(this.ROLE_SELECTED.id,data).subscribe((resp:any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toast.error("Validación", resp.message_text);
      }
      else {
        this.toast.success("Exito", "El Rol se editó correctamente.");
        this.RoleE.emit(resp.role); // Respuesta exitos del backend
        this.modal.close();
      }
    });
  }
}
