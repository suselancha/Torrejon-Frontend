import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UBIGEO_DEPARTAMENTOS } from 'src/app/config/ubigeo_departamentos';
import { UBIGEO_LOCALIDADES } from 'src/app/config/ubigeo_localidades';
import { UBIGEO_PROVINCIAS } from 'src/app/config/ubigeo_provincias';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvidersService } from '../service/providers.service';

@Component({
  selector: 'app-edit-providers',
  templateUrl: './edit-providers.component.html',
  styleUrls: ['./edit-providers.component.scss']
})
export class EditProvidersComponent {
  code:string = '';
  surname:string = '';
  name:string = '';
  razon_social:string = '';  
  phone:string = '';
  celular:string = '';
  email:string = '';  
  n_document:string = '';
  cuit:string = '';
  address:string = '';
  ubigeo_provincia:string = '';
  ubigeo_departamento:string = '';
  ubigeo_localidad:string = '';
  provincia:string = '';
  departamento:string = '';
  localidad:string = '';
  state:number = 1;

  PROVINCIAS:any = UBIGEO_PROVINCIAS;
  DEPARTAMENTOS:any = UBIGEO_DEPARTAMENTOS;
  DEPARTAMENTOS_SELECTEDS:any = [];
  LOCALIDADES:any = UBIGEO_LOCALIDADES;
  LOCALIDADES_SELECTEDS:any = [];

  isLoading$:any;

  errores: any = {};

  PROVIDER_ID:string = '';
  PROVIDER_SELECCIONADO:any = null;

  constructor(
    public toast: ToastrService,
    public providersService : ProvidersService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.PROVIDER_ID = resp.id;
    })
    this.isLoading$ = this.providersService.isLoading$;

    this.providersService.showClient(this.PROVIDER_ID).subscribe((resp:any) => {
      console.log(resp);
      this.PROVIDER_SELECCIONADO =resp.provider;

      this.code = this.PROVIDER_SELECCIONADO.code;
      this.surname = this.PROVIDER_SELECCIONADO.surname;
      this.name = this.PROVIDER_SELECCIONADO.name;
      this.razon_social = this.PROVIDER_SELECCIONADO.razon_social;      
      this.phone = this.PROVIDER_SELECCIONADO.phone;
      this.celular = this.PROVIDER_SELECCIONADO.celular;
      this.email = this.PROVIDER_SELECCIONADO.email;      
      this.n_document = this.PROVIDER_SELECCIONADO.n_document;
      this.cuit = this.PROVIDER_SELECCIONADO.cuit;
      this.address = this.PROVIDER_SELECCIONADO.address
      this.ubigeo_provincia = this.PROVIDER_SELECCIONADO.ubigeo_provincia;
      this.ubigeo_departamento = this.PROVIDER_SELECCIONADO.ubigeo_departamento;
      this.ubigeo_localidad = this.PROVIDER_SELECCIONADO.ubigeo_localidad;
      this.provincia = this.PROVIDER_SELECCIONADO.provincia;
      this.departamento = this.PROVIDER_SELECCIONADO.departamento;
      this.localidad = this.PROVIDER_SELECCIONADO.localidad;
      this.state = this.PROVIDER_SELECCIONADO.state;
      this.changeProvincia({target:{value: this.PROVIDER_SELECCIONADO.ubigeo_provincia}});
      this.changeDepartamento({target:{value: this.ubigeo_departamento}});
    });
  }

  back() {
    //this.location.back();
    this.router.navigate(['providers/list']);
  }

  changeProvincia($event:any){
    console.log($event.target.value);
    let PROVINCIA_ID = $event.target.value;
    console.log(PROVINCIA_ID);
    let PROVINCIA_SELECTED = this.PROVINCIAS.find((provincia:any) => provincia.id ==  PROVINCIA_ID);
    if(PROVINCIA_SELECTED){
      this.provincia = PROVINCIA_SELECTED.name;
    }
    let departamentos = this.DEPARTAMENTOS.filter((departamento:any) => departamento.provincia_id == PROVINCIA_ID);
    console.log(departamentos);
    this.DEPARTAMENTOS_SELECTEDS = departamentos;
  }

  changeDepartamento($event:any){
    //console.log($event.target.value);
    let DEPARTAMENTO_ID = $event.target.value;
    let DEPARTAMENTO_SELECTED = this.DEPARTAMENTOS.find((departamento:any) => departamento.id ==  DEPARTAMENTO_ID);
    if(DEPARTAMENTO_SELECTED){
      this.departamento = DEPARTAMENTO_SELECTED.name;
    }
    let localidades = this.LOCALIDADES.filter((localidad:any) => localidad.departamento_id == DEPARTAMENTO_ID);
    console.log(localidades);
    this.LOCALIDADES_SELECTEDS = localidades;
  }
  
  changeLocalidad($event:any){
    let LOCALIDAD_ID = $event.target.value;
    let LOCALIDAD_SELECTED = this.LOCALIDADES.find((localidad:any) => localidad.id ==  LOCALIDAD_ID);
    if(LOCALIDAD_SELECTED){
      this.localidad = LOCALIDAD_SELECTED.name;
    }
  }

  registrarProvider(){

    let data = {
      code: this.code,
      surname: this.surname,
      name: this.name,
      razon_social: this.razon_social,      
      phone: this.phone,
      celular: this.celular,
      email: this.email,      
      n_document: this.n_document,
      cuit: this.cuit,
      address: this.address,
      state: this.state,
      ubigeo_provincia: this.ubigeo_provincia,
      ubigeo_departamento: this.ubigeo_departamento,
      ubigeo_localidad: this.ubigeo_localidad,
      provincia: this.provincia,
      departamento: this.departamento,
      localidad: this.localidad
    }

    this.providersService.actualizarCliente(this.PROVIDER_ID,data).subscribe((resp:any) => {
      //console.log(resp);
      if (!resp.success) {                
        this.errores = resp.data;
      }
      else {
        this.toast.success("Exito",  resp.message);
        this.cleanForm();
        this.router.navigate(['providers/list']);
      }
    }, error => {
      //console.log(error);
      this.toast.error("Error Crítico",  error.error.message);
    });
  }

  cleanForm() {
    this.code = '';
    this.surname = '';
    this.name = '';
    this.razon_social = '';    
    this.phone = '';
    this.celular = '';
    this.email = '';    
    this.n_document = '';
    this.cuit = '';
    this.address = '';
    this.ubigeo_provincia = '';
    this.ubigeo_departamento = '';
    this.ubigeo_localidad = '';
    this.provincia = '';
    this.departamento = '';
    this.localidad = '';
    this.state = 1;
  
    this.PROVINCIAS = UBIGEO_PROVINCIAS;
    this.DEPARTAMENTOS = UBIGEO_DEPARTAMENTOS;
    this.DEPARTAMENTOS_SELECTEDS = [];
    this.LOCALIDADES = UBIGEO_LOCALIDADES;
    this.LOCALIDADES_SELECTEDS = [];
  }
}
