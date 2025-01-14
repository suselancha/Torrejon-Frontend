import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listWarehouses(page = 1, search:string = '') {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS + "/warehouses?page="+page+"&search="+search;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  registerWarehouse(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS + "/warehouses";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateWarehouse(ID_WAREHOUSE:string, data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/warehouses/"+ID_WAREHOUSE;
    return this.http.put(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteWarehouse(ID_WAREHOUSE:string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/warehouses/"+ID_WAREHOUSE;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}

