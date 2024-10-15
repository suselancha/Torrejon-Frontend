import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../service/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  @Output() UserC: EventEmitter<any> = new EventEmitter();
  @Input() roles:any = [];

  name:string = '';
  email:string = '';
  password:string = '';
  password_confirm:string = '';
  role_id:string = '';

  isLoading:any;

  constructor(
    public modal: NgbActiveModal,
    public usersService: UsersService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    
  }

  store() {

    if(!this.name) {
      this.toast.error("Validación", "El nombre es requerido");
      return false;
    }

    if(!this.email) {
      this.toast.error("Validación", "El email requerido");
      return false;
    }

    if(!this.password) {
      this.toast.error("Validación", "La contraseña es requerida");
      return false;
    }

    if(this.password != this.password_confirm) {
      this.toast.error("Validación", "La contraseña no fué confirmada");
      return false;
    }

    if(!this.role_id) {
      this.toast.error("Validación", "El rol es tequerido");
      return false;
    }

    let formData = new FormData();

    formData.append("name", this.name);
    formData.append("email", this.email);
    formData.append("password", this.password);    
    formData.append("role_id", this.role_id);
    formData.append("empresa_id", "1");

    // if(this.address) {
    //   formData.append("address", this.address);
    // }

    this.usersService.registerUser(formData).subscribe((resp:any) => {
      console.log(resp);

      if (resp.message == 403) {
        this.toast.error("Validación", resp.message_text);
      }
      else {
        this.toast.success("Exito", "El Usuario se registró correctamente.");
        this.UserC.emit(resp.user);
        this.modal.close();
      }
      
    });    

  }
}
