import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFunctionService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  registerEmployeeFunction(data:any){
    this.isLoadingSubject.next(true); // Inicio petición
    let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authService.token});
    let URL = URL_SERVICIOS+"/employee_functions";
    // Con pipe y finalize finalizo petición.
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listEmployeeFunctions(page =1,search:string = ''){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authService.token});
    let URL = URL_SERVICIOS+"/employee_functions?page="+page+"&search="+search;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}
