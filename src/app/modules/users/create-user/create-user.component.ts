import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmployeeFunctionService } from '../../configuration/employee-function/service/employee-function.service';
import { ZonaService } from '../../configuration/zonas/service/zona.service';
import { RolesService } from '../../roles/service/roles.service';

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
  employee_function_id:string = '';
  zona_id:string = '';
  create_user:boolean = false;
  is_user:string = '0';
  notFunction:boolean;

  isLoading$:any;
  ROLES:any = [];
  FUNCTIONS:any = [];
  ZONAS:any = [];
  errors:any = {};

  constructor(
    public usersService: UsersService,
    public roleService: RolesService,
    public employeeFunctionService: EmployeeFunctionService,
    public zonaService: ZonaService,
    public toast: ToastrService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {    
    this.isLoading$ = this.usersService.isLoading$;
    this.configAll();
    this.notFunction = true;
  }

  configAll() {
    this.usersService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.ROLES = resp.roles;
      this.FUNCTIONS = resp.functions;
      this.ZONAS = resp.zonas;
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

  changeFunction($event:any) {
    let function_allowed = ["1","2","3"];
    let id_selected = $event.target.value;
    this.notFunction = !function_allowed.includes(id_selected);
  }

  back() {
    //this.location.back();
    this.router.navigate(['usuarios/list']);
  }

  store() {

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
    formData.append("employee_function_id", this.employee_function_id);
    formData.append("zona_id", this.zona_id);
    formData.append("is_user", this.is_user);

    console.log(formData);

    this.usersService.registerUser(formData).subscribe((resp:any) => {
      console.log(resp);
      let success = resp.message == 200;
      if (success) {
        this.toast.success("Exito", "El empleado se registró correctamente.");
        this.router.navigate(['usuarios/list']);
      }
      else if(!success) {
        this.errors = resp.data;
      }
      
    });

  }
}
