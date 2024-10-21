import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UBIGEO_DEPARTAMENTOS } from 'src/app/config/ubigeo_departamentos';
import { UBIGEO_LOCALIDADES } from 'src/app/config/ubigeo_localidades';
import { UBIGEO_PROVINCIAS } from 'src/app/config/ubigeo_provincias';
import { ClientsService } from '../service/clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {

  // Valores que vienen del componente PADRE (listado)
  // Mismo nombre de la variable el padre e hijo
  @Input() client_segments:any = [];

  surname:string = '';
  name:string = '';
  cuit:string = '';
  razon_social:string = '';
  address:string = '';
  client_segment_id:string = '';
  type_document:string = '';
  n_document:string = '';
  code:string = '';
  phone:string = '';
  celular:string = '';
  email:string = '';

  PROVINCIAS:any = UBIGEO_PROVINCIAS;
  DEPARTAMENTOS:any = UBIGEO_DEPARTAMENTOS;
  DEPARTAMENTOS_SELECTEDS:any = [];
  LOCALIDADES:any = UBIGEO_LOCALIDADES;
  LOCALIDADES_SELECTEDS:any = [];
  
  ubigeo_provincia:string = '';
  ubigeo_departamento:string = '';
  ubigeo_localidad:string = '';
  provincia:string = '';
  departamento:string = '';
  localidad:string = '';

  isLoading:any;

  constructor(    
    public toast: ToastrService,
    public clientsService : ClientsService,
  ) {

  }

  ngOnInit(): void {
    
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

  store(){
    if(!this.type_document || !this.n_document ||
      !this.name || !this.surname || !this.client_segment_id ||
      !this.ubigeo_provincia || !this.ubigeo_departamento || !this.ubigeo_localidad ||
      !this.address
    ){
      this.toast.error("Validación","Todos los campos con referencia (*) son obligatorios");
      return false;
    }

    let LOCALIDAD_SELECTED = this.LOCALIDADES.find((localidad:any) => localidad.id ==  this.ubigeo_localidad);
    if(LOCALIDAD_SELECTED){
      this.localidad = LOCALIDAD_SELECTED.name;
    }

    let data = {
      name: this.name,
      surname: this.surname,
      full_name: this.name + ' '+ this.surname,
      address: this.address,
      client_segment_id: this.client_segment_id,
      type_document: this.type_document,
      n_document: this.n_document,
      code: this.code,
      phone: this.phone,
      celular: this.celular,
      email: this.email,
      ubigeo_provincia: this.ubigeo_provincia,
      ubigeo_departamento: this.ubigeo_departamento,
      ubigeo_localidad: this.ubigeo_localidad,
      provincia: this.provincia,
      departamento: this.departamento,
      localidad: this.localidad,
      type: 1,
    }

    this.clientsService.registerClient(data).subscribe((resp:any) => {
      console.log(resp);
      // Validamos el error del controlador Laravel
      if(resp.message == 403){
        this.toast.error("Validación",resp.message_text);        
      }else{
        this.toast.success("Éxito","El cliente se registró corrrectamente");        
      }
    })
  }
}
