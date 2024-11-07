import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { UsersService } from '../service/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  @Output() UserD: EventEmitter<any> = new EventEmitter();
  @Input() USER_SELECTED:any;

  name:string = '';
  isLoading:any;
  SIDEBAR:any = SIDEBAR;
  permissions:any = [];

  constructor(
    public modal: NgbActiveModal,
    public usersService: UsersService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    
  }

  delete() {

    this.usersService.deleteUser(this.USER_SELECTED.id).subscribe((resp:any) => {
      console.log(resp);

      if (resp.message == 400) {
        this.toast.error("Validación", resp.message_text);
      }
      else {
        this.toast.success("Exito", "El Empleado fue eliminado correctamente.");
        this.UserD.emit(resp.user);
        this.modal.close();
      }
      
    });    

  }
}
