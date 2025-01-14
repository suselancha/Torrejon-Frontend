import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  registerZona(data:any){
    this.isLoadingSubject.next(true); // Inicio petición
    let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authService.token});
    let URL = URL_SERVICIOS+"/zonas";
    // Con pipe y finalize finalizo petición.
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listZonas(page =1,search:string = ''){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authService.token});
    let URL = URL_SERVICIOS+"/zonas?page="+page+"&search="+search;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateZona(ID_ZONA:string, data:any){
    this.isLoadingSubject.next(true); // Inicio petición
    let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authService.token});
    let URL = URL_SERVICIOS+"/zonas/"+ID_ZONA;
    return this.http.put(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteZona(ID_ZONA:string){
    this.isLoadingSubject.next(true); // Inicio petición
    let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authService.token});
    let URL = URL_SERVICIOS+"/zonas/"+ID_ZONA;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}
