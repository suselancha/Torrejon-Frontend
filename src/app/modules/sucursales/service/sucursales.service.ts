import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  configAll() {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/sucursales/config";
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listSucursales(page = 1, data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/sucursales/index?page=" + page;
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  registrarSucursal(data: any) {
    //console.log(data);
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/sucursales";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  showSucursal(SUCURSAL_ID: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/sucursales/" + SUCURSAL_ID;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  actualizarSucursal(SUCURSAL_ID: string, data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/sucursales/" + SUCURSAL_ID;
    return this.http.put(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  searchClients(code_client:string, n_document_client:string, surname_client:string){
    let LINK = "";
    if(code_client){
      LINK += "&code="+code_client;
    }
    if(n_document_client){
      LINK += "&n_document="+n_document_client;
    }
    if(surname_client){
      LINK += "&surname="+surname_client;
    }
    let URL = URL_SERVICIOS + "/sucursales/search-clients?p=1"+LINK;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    return this.http.get(URL, { headers: headers });
  }

  searchZonas(zona_client:string){
    let LINK = "";
    if(zona_client){
      LINK += "&name="+zona_client;
    }
    let URL = URL_SERVICIOS + "/sucursales/search-zonas?p=1"+LINK;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    return this.http.get(URL, { headers: headers });
  }
}
