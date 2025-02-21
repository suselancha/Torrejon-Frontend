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
  zonas: any=[];
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

    let formData = {
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
      password_confirmation: this.password_confirmation,
      role_id: this.role_id,
      employee_function_id: this.employee_function_id,
      zonas: this.zonas,
      is_user: this.is_user,
    }


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
