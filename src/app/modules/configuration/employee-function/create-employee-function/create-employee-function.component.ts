import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFunctionService } from '../service/employee-function.service';

@Component({
  selector: 'app-create-employee-function',
  templateUrl: './create-employee-function.component.html',
  styleUrls: ['./create-employee-function.component.scss']
})
export class CreateEmployeeFunctionComponent {

  @Output() EmployeeFunctionC: EventEmitter<any> = new EventEmitter();
  name:string = '';
  isLoading:any;

  constructor(
    public modal: NgbActiveModal,
    public toast: ToastrService,
    public employeeFunctionService : EmployeeFunctionService,
  ) {

  }

  ngOnInit(): void {
    
  }

  store(){
    if(!this.name){
      this.toast.error("Validación","El nombre de la función es requerido");
      return false;
    }

    let data = {
      name: this.name
    }

    this.employeeFunctionService.registerEmployeeFunction(data).subscribe((resp:any) => {
      console.log(resp);
      // Validamos el error del controlador Laravel
      if(resp.message == 403){
        this.toast.error("Validación",resp.message_text);        
      }else{
        this.toast.success("Éxito","La función se registró corrrectamente");        
        this.EmployeeFunctionC.emit(resp.employee_function);
        this.modal.close();
      }
    })
  }
}
