import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEmployeeFunctionComponent } from '../create-employee-function/create-employee-function.component';
import { EmployeeFunctionService } from '../service/employee-function.service';

@Component({
  selector: 'app-list-employee-function',
  templateUrl: './list-employee-function.component.html',
  styleUrls: ['./list-employee-function.component.scss']
})
export class ListEmployeeFunctionComponent {

  search:string = '';
  EMPLOYEEFUNCTIONS:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 0;

  constructor(
    public modalService: NgbModal,
    public employeeFunctionService : EmployeeFunctionService,
  ) {

  }

  ngOnInit(): void {
    // Renderizado del servicio con el componente
    this.isLoading$ = this.employeeFunctionService.isLoading$;
    this.listEmployeeFunctions();
  }

  listEmployeeFunctions(page = 1){
    this.employeeFunctionService.listEmployeeFunctions(page,this.search).subscribe((resp:any) => {
      console.log(resp);
      this.EMPLOYEEFUNCTIONS = resp.employee_functions;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  loadPage($event:any){
    this.listEmployeeFunctions($event);
  }

  createEmployeeFunction() {
    // Inicializo un componente hijo
    const modalRef = this.modalService.open(CreateEmployeeFunctionComponent,{centered: true, size: 'md'});
    // Recepcionamos valor enviado por el componente hijo
    modalRef.componentInstance.EmployeeFunctionC.subscribe((employee_function:any) => {
      this.EMPLOYEEFUNCTIONS.unshift(employee_function);
    })
  }

  editEmployeeFunction(EMPLOYEEFUNCTION:any){

  }

  deleteEmployeeFunction(EMPLOYEEFUNCTION:any){
    
  }

}
