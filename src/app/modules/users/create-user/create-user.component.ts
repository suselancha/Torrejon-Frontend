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
  surname:string = '';
  email:string = '';
  password:string = '';
  password_confirm:string = '';
  phone:string = '';
  role_id:string = '';
  gender:string = '';
  type_document:string = 'DNI';
  n_document:string = '';
  address:string = '';
  file_name:any;
  imagen_previsualiza:any;
  isLoading:any;

  constructor(
    public modal: NgbActiveModal,
    public usersService: UsersService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    
  }

  processFile($event:any) {
    if($event.target.files[0].type.indexOf("image") < 0) {
      this.toast.warning("AVISO", "El archivo para avatar no es una imagen");
      return;
    }

    this.file_name = $event.target.files[0];
    let reader = new FileReader;
    reader.readAsDataURL(this.file_name);
    reader.onloadend = () => this.imagen_previsualiza = reader.result;
  }

  store() {

    if(!this.name) {
      this.toast.error("Validación", "El nombre es un campo requerido");
      return false;
    }

    if(!this.surname) {
      this.toast.error("Validación", "El apellido es un campo requerido");
      return false;
    }

    if(!this.email) {
      this.toast.error("Validación", "El email es un campo requerido");
      return false;
    }

    if(!this.password) {
      this.toast.error("Validación", "La contraseña es un campo requerido");
      return false;
    }

    if(this.password != this.password_confirm) {
      this.toast.error("Validación", "La contraseña no fué confirmada");
      return false;
    }

    if(!this.role_id) {
      this.toast.error("Validación", "El rol es un campo requerido");
      return false;
    }

    if(!this.phone) {
      this.toast.error("Validación", "El telefono es un campo requerido");
      return false;
    }

    if(!this.gender) {
      this.toast.error("Validación", "El genero es un campo requerido");
      return false;
    }

    if(!this.n_document || !this.type_document) {
      this.toast.error("Validación", "El tipo y numero de documento son campos requeridos");
      return false;
    }

    let formData = new FormData();

    formData.append("name", this.name);
    formData.append("surname", this.surname);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("phone", this.phone);
    formData.append("role_id", this.role_id);
    formData.append("gender", this.gender);
    formData.append("type_document", this.type_document);
    formData.append("n_document", this.n_document);
    formData.append("image", this.file_name);

    if(this.address) {
      formData.append("address", this.address);
    }

    this.usersService.registerUser(formData).subscribe((resp:any) => {
      console.log(resp);

      if (resp.message == 403) {
        this.toast.error("Validación", resp.message_text);
      }
      else {
        this.toast.success("Exito", "El Usuario fue registrado correctamente.");
        this.UserC.emit(resp.user);
        this.modal.close();
      }
      
    });    

  }
}
