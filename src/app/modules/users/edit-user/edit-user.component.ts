import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  
  employee_id:string = '';
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
  password:string = '';
  password_confirm:string = '';
  role_id:string = '';
  zone_id:string = '';
  is_user:string = '';
  create_user:boolean;
  roles:any = [];
  isLoading$:any;
  
  file_name:any;
  imagen_previsualiza:any;
  

  constructor(
    public usersService: UsersService,
    public toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.usersService.isLoading$;
    this.configAll();
    this.employee_id = this.route.snapshot.params['id'];
    this.setUser(this.employee_id);    
  }

  configAll() {
    this.usersService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.roles = resp.roles;
    });
    
  }

  setUser(id:string) {
    this.usersService.getUser(id).subscribe((resp:any) => {
      console.log(resp);
      this.name = resp.user.name;
      this.surname = resp.user.surname;
      this.document = resp.user.document;
      this.jobcode = resp.user.jobcode;
      this.date_entry = resp.user.date_entry;
      this.phone = resp.user.phone;
      this.cell = resp.user.cell;
      this.code = resp.user.code;
      this.address   = resp.user.address;
      this.email = resp.user.email;
      this.role_id = resp.user.role_id;
      this.zone_id = resp.user.zone_id;
      this.is_user = resp.user.is_user;
      this.create_user = Boolean(this.is_user);    
      this.password = '';
      this.password_confirm = '';
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
    this.router.navigate(['usuarios/list']);
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

    if(!this.zone_id) {
      this.toast.error("Validación", "La zona es campo requerido");
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

      if(this.password != this.password_confirm) {
        this.toast.error("Validación", "La contraseña no fué confirmada");
        return false;
      }
    }

    let data = {
      name: this.name,
      surname: this.surname,
      document: this.document,
      jobcode: this.jobcode,
      date_entry: this.date_entry,
      phone: this.phone,
      cell: this.cell,
      code: this.code,
      address: this.address,
      email: this.email,
      password: this.password,
      role_id: this.role_id,
      zone_id: this.zone_id,
      is_user: this.is_user
    }    

    console.log(data);

    this.usersService.updateUser(this.employee_id, data).subscribe((resp:any) => {
      console.log(resp);

      if (resp.message == 403) {
        this.toast.error("Validación", resp.message_text);
      }
      else {
        this.toast.success("Exito", "El empleado se actualizó correctamente.");
        this.router.navigate(['usuarios/list']);
      }
      
    });

  }  

}
