import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  name:string = '';
  surname:string = '';
  document:string = '';
  jobcode:string = '';
  date_entry:string = '';
  phone:string = '';
  cell:string = '';
  code:string = '';
  address:string = '';
  email:string = '';
  password:string = '12345678';
  password_confirmation:string = '12345678';
  role_id:string = '';
  create_user:boolean = false;
  is_user:string = '0';

  isLoading$:any;
  roles:any = [];
  errors:any = {};

  constructor(
    public usersService: UsersService,
    public toast: ToastrService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {    
    this.isLoading$ = this.usersService.isLoading$;
    this.configAll();
  }

  configAll() {
    this.usersService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.roles = resp.roles;
    });
    
  }

  setIsUser() {
    if(this.is_user == "1") {
      this.is_user = "0";
    }
    else {
      this.is_user = "1";
    }
  }

  back() {
    //this.location.back();
    this.router.navigate(['usuarios/list']);
  }

  store() {

    /* if(!this.name) {
      this.toast.error("Validación", "El nombre es requerido");
      return false;
    }

    if(!this.surname) {
      this.toast.error("Validación", "El apellido es requerido");
      return false;
    }

    if(!this.document) {
      this.toast.error("Validación", "El numero de documento es campo requerido");
      return false;
    }

    if(!this.jobcode) {
      this.toast.error("Validación", "El CUIL es campo requerido");
      return false;
    }

    if(!this.date_entry) {
      this.toast.error("Validación", "La fecha de alta es campo requerido");
      return false;
    }
    
    if(!this.phone) {
      this.toast.error("Validación", "El numero de teléfono es campo requerido");
      return false;
    }
    
    if(!this.cell) {
      this.toast.error("Validación", "El género es campo requerido");
      return false;
    }
    
    if(!this.code) {
      this.toast.error("Validación", "El código es campo requerido");
      return false;
    }

    if(!this.address) {
      this.toast.error("Validación", "La dirección es campo requerido");
      return false;
    }

    if(!this.role_id) {
      this.toast.error("Validación", "El rol es campo requerido");
      return false;
    }

    if(!this.email) {
      this.toast.error("Validación", "El email es campo requerido");
      return false;
    }

    if(this.create_user) {
      if(!this.password) {
        this.toast.error("Validación", "La contraseña es requerida");
        return false;
      }

      if(this.password != this.password_confirmation) {
        this.toast.error("Validación", "La contraseña no fué confirmada");
        return false;
      }
    } */

    let formData = new FormData();

    formData.append("name", this.name);
    formData.append("surname", this.surname);
    formData.append("document", this.document);
    formData.append("jobcode", this.jobcode);
    formData.append("date_entry", this.date_entry);    
    formData.append("phone", this.phone);
    formData.append("cell", this.cell);
    formData.append("code", this.code);
    formData.append("address", this.address);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("password_confirmation", this.password_confirmation);
    formData.append("role_id", this.role_id);
    formData.append("is_user", this.is_user);

    console.log(formData);

    this.usersService.registerUser(formData).subscribe((resp:any) => {
      console.log(resp);

      if (resp.success) {
        this.toast.success("Exito", "El empleado se registró correctamente.");
        this.router.navigate(['usuarios/list']);
      }
      else if(!resp.success) {
        this.errors = resp.data;
      }
      
    });

  }
}
