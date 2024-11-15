import { Component } from '@angular/core';
import { UBIGEO_DEPARTAMENTOS } from 'src/app/config/ubigeo_departamentos';
import { UBIGEO_LOCALIDADES } from 'src/app/config/ubigeo_localidades';
import { UBIGEO_PROVINCIAS } from 'src/app/config/ubigeo_provincias';
import { SucursalesService } from '../service/sucursales.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from '../../clients/create-client/create-client.component';
import { SearchClientsComponent } from '../components/search-clients/search-clients.component';
import { SearchZonasComponent } from '../components/search-zonas/search-zonas.component';

@Component({
  selector: 'app-create-sucursales',
  templateUrl: './create-sucursales.component.html',
  styleUrls: ['./create-sucursales.component.scss']
})
export class CreateSucursalesComponent {

  code_client:string = '';
  n_document_client:string = '';
  surname_client:string = '';
  zona_client:string = '';

  CLIENT_SELECTED:any;
  ZONA_SELECTED:any;

  code:string = '';
  nombre:string = '';
  referencia:string = '';
  phone:string = '';
  celular:string = '';
  email:string = '';  
  direccion:string = '';
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
 
  CLIENT_SEGMENTS:any = [];

  isLoading$:any;

  errores: any = {};

  constructor(
    public toast: ToastrService,
    public sucursalesService : SucursalesService,
    public modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.sucursalesService.isLoading$;
    this.listConfig();
  }

  listConfig(){    
    this.sucursalesService.configAll().subscribe((resp:any) => {
      //console.log(resp);
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

  registrarCliente(){

    let data = {
      code: this.code,      
      nombre: this.nombre,
      referencia: this.referencia,      
      phone: this.phone,
      celular: this.celular,
      email: this.email,      
      direccion: this.direccion,
      state: this.state,
      ubigeo_provincia: this.ubigeo_provincia,
      ubigeo_departamento: this.ubigeo_departamento,
      ubigeo_localidad: this.ubigeo_localidad,
      provincia: this.provincia,
      departamento: this.departamento,
      localidad: this.localidad
    }

    this.sucursalesService.registrarSucursal(data).subscribe((resp:any) => {
      //console.log(resp);
      if (!resp.success) {                
        this.errores = resp.data;
      }
      else {
        this.toast.success("Exito",  resp.message);
        this.cleanForm();
      }
    }, error => {
      //console.log(error);
      this.toast.error("Error Crítico",  error.error.message);
    });
  }

  cleanForm() {
    this.code = '';    
    this.nombre = '';
    this.referencia = '';    
    this.phone = '';
    this.celular = '';
    this.email = '';    
    this.direccion = '';
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

  buscarClientes(){
    console.log("buscando clientes....")
    // this.sucursalesService.searchClients(this.code_client, this.n_document_client, this.surname_client).subscribe((resp:any) => {
    //   console.log(resp);
    //   if(resp.clients.length > 1){
    //     this.openSelectedClients(resp.clients);
    //   }else{
    //     if(resp.clients.length==1){
    //       this.CLIENT_SELECTED = resp.clients[0];
    //     }else{
    //       alert("NO EXISTE COINCIDENCIA EN LA BUSQUEDA");
    //     }
    //   }
    // });    
  }

  limpiarBusquedaClientes() {
    // this.code_client = '';
    // this.n_document_client = '';
    // this.surname_client = '';
  }

  openSelectedClients(clients:any=[]){
    const modalRef = this.modalService.open(SearchClientsComponent,{size:'lg',centered:true});
    // Paso lista de clientes
    // Debo declarar @Input() clientes en el modal
    modalRef.componentInstance.clientes = clients;
  }
  
}
