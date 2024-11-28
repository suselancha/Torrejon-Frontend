import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  configAll() {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/accounts/config";
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listAccounts(page = 1, search:string = '') {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/accounts?page="+page+"&search="+search;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  registerAccount(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/accounts";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateAccount(ID_ACCOUNT:string, data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/accounts/"+ID_ACCOUNT;
    // Si trabajamos con imagenes usar POST
    return this.http.put(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteAccount(ID_ACCOUNT:string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS +"/accounts/"+ID_ACCOUNT;
    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  filterAccounts(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/accounts/filter";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getAccount(ID_ACCOUNT:string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/accounts/"+ID_ACCOUNT;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
