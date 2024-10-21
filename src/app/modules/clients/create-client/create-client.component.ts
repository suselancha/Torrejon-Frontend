import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UBIGEO_DEPARTAMENTOS } from 'src/app/config/ubigeo_departamentos';
import { UBIGEO_LOCALIDADES } from 'src/app/config/ubigeo_localidades';
import { UBIGEO_PROVINCIAS } from 'src/app/config/ubigeo_provincias';
import { ClientsService } from '../service/clients.service';
import { TemplateBindingParseResult } from '@angular/compiler';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {

  code:string = '';
  surname:string = '';
  name:string = '';
  razon_social:string = '';
  client_segment_id:string = '';
  phone:string = '';
  celular:string = '';
  email:string = '';
  type_document:string = '';
  n_document:string = '';
  cuit:string = '';
  address:string = '';
  ubigeo_provincia:string = '';
  ubigeo_departamento:string = '';
  ubigeo_localidad:string = '';
  provincia:string = '';
  departamento:string = '';
  localidad:string = '';

  PROVINCIAS:any = UBIGEO_PROVINCIAS;
  DEPARTAMENTOS:any = UBIGEO_DEPARTAMENTOS;
  DEPARTAMENTOS_SELECTEDS:any = [];
  LOCALIDADES:any = UBIGEO_LOCALIDADES;
  LOCALIDADES_SELECTEDS:any = [];
 
  CLIENT_SEGMENTS:any = [];

  isLoading$:any;

  constructor(
    public toast: ToastrService,
    public clientsService : ClientsService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.clientsService.isLoading$;
    this.listConfig();
  }

  listConfig(){    
    this.clientsService.configAll().subscribe((resp:any) => {
      console.log(resp);
      this.CLIENT_SEGMENTS = resp.client_segments; // Respuesta del backend      
    })
  }

  changeProvincia($event:any){
    console.log($event.target.value);
    let PROVINCIA_ID = $event.target.value;
    let PROVINCIA_SELECTED = this.PROVINCIAS.find((provincia:any) => provincia.id ==  PROVINCIA_ID);
    if(PROVINCIA_SELECTED){
      this.provincia = PROVINCIA_SELECTED.name;
    }
    let departamentos = this.DEPARTAMENTOS.filter((departamento:any) => departamento.provincia_id == PROVINCIA_ID);
    console.log(departamentos);
    this.DEPARTAMENTOS_SELECTEDS = departamentos;
  }

  changeDepartamento($event:any){
    console.log($event.target.value);
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
    console.log($event.target.value);
    this.localidad = $event.target.value;
  }

  registrarCliente(){

    if(!this.client_segment_id){
      this.toast.error("Validación","Necesita seleccionar un tipo de cliente");
      return false;
    }

    if(!this.provincia){
      this.toast.error("Validación","Necesita seleccionar provincia");
      return false;
    }

    if(!this.departamento){
      this.toast.error("Validación","Necesita seleccionar departamento");
      return false;
    }

    if(!this.localidad){
      this.toast.error("Validación","Necesita seleccionar localidad");
      return false;
    }


    let data = {
      code: this.code,
      surname: this.surname,
      name: this.name,
      razon_social: this.razon_social,
      client_segment_id: this.client_segment_id,
      phone: this.phone,
      celular: this.celular,
      email: this.email,
      type_document: this.type_document,
      n_document: this.n_document,
      cuit: this.cuit,
      address: this.address,
      ubigeo_provincia: this.ubigeo_provincia,
      ubigeo_departamento: this.ubigeo_departamento,
      ubigeo_localidad: this.ubigeo_localidad,
      provincia: this.provincia,
      departamento: this.departamento,
      localidad: this.localidad
    }

    this.clientsService.registrarCliente(data).subscribe((resp:any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toast.error("Validación", resp.message_text);
      }
      else {
        this.toast.success("Exito", "El Cliente se creó correctamente.");        
      }
    });


  }

  
}
