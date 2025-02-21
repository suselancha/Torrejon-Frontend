import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/_fake/services/role.service';
import { EmployeeFunctionService } from '../../configuration/employee-function/service/employee-function.service';
import { ZonaService } from '../../configuration/zonas/service/zona.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [DatePipe]
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
  password_confirmation:string = '';
  password_default: string = '12345678';
  role_id:string = '';
  employee_function_id:string = '';
  zonas:any = [];
  is_user:string = '';
  create_user:boolean;
  roles:any = [];
  notFunction:boolean;
  function_allowed:any = [];
  
  file_name:any;
  imagen_previsualiza:any;
  isLoading$:any;  
  ROLES:any = [];
  FUNCTIONS:any = [];
  ZONAS:any = [];
  errors:any = {};
  

  constructor(
    public usersService: UsersService,
    public roleService: RoleService,
    public employeeFunctionService: EmployeeFunctionService,
    public zonaService: ZonaService,
    public toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.usersService.isLoading$;
    this.function_allowed = ["0","1","2","3"];
    this.configAll();
    this.employee_id = this.route.snapshot.params['id'];
    this.setUser(this.employee_id);
  }

  configAll() {
    this.usersService.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.ROLES = resp.roles;
      this.FUNCTIONS = resp.functions;
      this.ZONAS = resp.zonas;
    });
    
  }

  setUser(id:string) {
    this.usersService.getUser(id).subscribe((resp:any) => {
      console.log(resp);
      this.name = resp.user.name;
      this.surname = resp.user.surname;
      this.document = resp.user.document;
      this.jobcode = resp.user.jobcode;
      let fecha = new Date(resp.user.date_entry);
      this.date_entry = fecha.toISOString().split('T')[0];
      this.phone = resp.user.phone;
      this.cell = resp.user.cell;
      this.code = resp.user.code;
      this.address   = resp.user.address;
      this.email = resp.user.email;
      this.role_id = resp.user.role_id;
      this.employee_function_id = resp.user.employee_function_id ??= 0;
      this.zonas = resp.user.zonas ?? [];
      this.is_user = resp.user.is_user;
      this.create_user = Boolean(this.is_user);
      if (!this.create_user){
        this.password = this.password_default;
        this.password_confirmation = this.password_default;
      }
      else {
        this.password = '';
        this.password_confirmation = '';
      }
      this.changeFunction();
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

  changeFunction() {    
    this.notFunction = !this.function_allowed.includes(this.employee_function_id.toString());
    console.log(this.notFunction, this.employee_function_id);
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
      password_confirmation: this.password_confirmation,
      role_id: this.role_id,
      employee_function_id: this.employee_function_id,
      zonas: this.zonas,
      is_user: this.is_user
    }    

    console.log(data);

    this.usersService.updateUser(this.employee_id, data).subscribe((resp:any) => {
      console.log(resp);
      let success = resp.message == 200;
      if (success) {
        this.toast.success("Exito", "El empleado se actualizó correctamente.");
        this.router.navigate(['usuarios/list']);
      }
      else if(!success) {
        this.errors = resp.data;
      }
      
    });

  }  

}
