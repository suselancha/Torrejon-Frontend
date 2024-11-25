import { Component } from '@angular/core';
import { UBIGEO_DEPARTAMENTOS } from 'src/app/config/ubigeo_departamentos';
import { UBIGEO_LOCALIDADES } from 'src/app/config/ubigeo_localidades';
import { UBIGEO_PROVINCIAS } from 'src/app/config/ubigeo_provincias';
import { SucursalesService } from '../service/sucursales.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchClientsComponent } from '../components/search-clients/search-clients.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-sucursales',
  templateUrl: './edit-sucursales.component.html',
  styleUrls: ['./edit-sucursales.component.scss']
})
export class EditSucursalesComponent {
  code_client:string = '';
  n_document_client:string = '';
  surname_client:string = '';  

  CLIENT_SELECTED:any;
  ZONA_SELECTED:any;

  code:string = '';
  nombre:string = '';
  direccion:string = '';  
  telefono:string = '';
  celular:string = '';
  email:string = '';
  referencia:string = '';
  ubigeo_provincia:string = '';
  ubigeo_departamento:string = '';
  ubigeo_localidad:string = '';
  provincia:string = '';
  departamento:string = '';
  localidad:string = '';
  state:number = 1;
  zona_id:string = '';
  client_id:string = '';

  PROVINCIAS:any = UBIGEO_PROVINCIAS;
  DEPARTAMENTOS:any = UBIGEO_DEPARTAMENTOS;
  DEPARTAMENTOS_SELECTEDS:any = [];
  LOCALIDADES:any = UBIGEO_LOCALIDADES;
  LOCALIDADES_SELECTEDS:any = [];
 
  ZONAS:any = [];
  isLoading$:any;
  errores: any = {};

  SUCURSAL_ID:string = '';
  SUCURSAL_SELECCIONADA:any = null;

  constructor(
    public toast: ToastrService,
    public sucursalesService : SucursalesService,
    public modalService: NgbModal,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.SUCURSAL_ID = resp.id;
    })
    this.isLoading$ = this.sucursalesService.isLoading$;

    this.sucursalesService.showSucursal(this.SUCURSAL_ID).subscribe((resp:any) => {
      console.log(resp);
      this.SUCURSAL_SELECCIONADA = resp.sucursal;
      //this.CLIENT_SELECTED = resp.

      this.code = this.SUCURSAL_SELECCIONADA.code;
      this.nombre = this.SUCURSAL_SELECCIONADA.nombre;
      this.direccion = this.SUCURSAL_SELECCIONADA.direccion;
      this.telefono = this.SUCURSAL_SELECCIONADA.telefono;    
      this.celular = this.SUCURSAL_SELECCIONADA.celular;
      this.email = this.SUCURSAL_SELECCIONADA.email;
      this.referencia = this.SUCURSAL_SELECCIONADA.referencia;      
      this.ubigeo_provincia = this.SUCURSAL_SELECCIONADA.ubigeo_provincia;
      this.ubigeo_departamento = this.SUCURSAL_SELECCIONADA.ubigeo_departamento;
      this.ubigeo_localidad = this.SUCURSAL_SELECCIONADA.ubigeo_localidad;
      this.provincia = this.SUCURSAL_SELECCIONADA.provincia;
      this.departamento = this.SUCURSAL_SELECCIONADA.departamento;
      this.localidad = this.SUCURSAL_SELECCIONADA.localidad;
      this.state = this.SUCURSAL_SELECCIONADA.state;
      this.zona_id = this.SUCURSAL_SELECCIONADA.zona_id;
      this.client_id = this.SUCURSAL_SELECCIONADA.client_id;
      this.changeProvincia({target:{value: this.SUCURSAL_SELECCIONADA.ubigeo_provincia}});
      this.changeDepartamento({target:{value: this.ubigeo_departamento}});
    });

    this.listConfig();
  }

  listConfig(){    
    this.sucursalesService.configAll().subscribe((resp:any) => {
      //console.log(resp);
      this.ZONAS = resp.zonas; // Respuesta del backend      
    })
  }

  back() {
    //this.location.back();
    this.router.navigate(['sucursales/listado']);
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

  registrarSucursal(){

    let data = {
      code: this.code,      
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      celular: this.celular,
      email: this.email,      
      referencia: this.referencia,            
      ubigeo_provincia: this.ubigeo_provincia,
      ubigeo_departamento: this.ubigeo_departamento,
      ubigeo_localidad: this.ubigeo_localidad,
      provincia: this.provincia,
      departamento: this.departamento,
      localidad: this.localidad,
      state: this.state,
      client_id: this.client_id,
      zona_id: this.zona_id
    }

    this.sucursalesService.registrarSucursal(data).subscribe((resp:any) => {
      //console.log(resp);
      if (!resp.success) {                
        this.errores = resp.data;
      }
      else {
        this.toast.success("Exito",  resp.message);
        this.cleanForm();
        this.router.navigate(['sucursales/listado']);
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
    this.telefono = '';
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
    //console.log("buscando clientes....");
    if(!this.code_client && !this.n_document_client && !this.surname_client){
      this.toast.error("Validación","Necesitas ingresar al menos uno de los campos de Selec.Cliente");
      return;
    }
    this.sucursalesService.searchClients(this.code_client, this.n_document_client, this.surname_client).subscribe((resp:any) => {
      console.log(resp);
      if(resp.clients.length > 1){
        this.openSelectedClients(resp.clients);
      }else{
        if(resp.clients.length==1){
          this.CLIENT_SELECTED = resp.clients[0];
          this.client_id = this.CLIENT_SELECTED.id;
          this.code_client = this.CLIENT_SELECTED.code;
          this.n_document_client = this.CLIENT_SELECTED.n_document+"/"+this.CLIENT_SELECTED.cuit;
      this.surname_client = this.CLIENT_SELECTED.surname+"/"+this.CLIENT_SELECTED.razon_social;
          this.toast.success("Exito","Se selecciono el cliente");      
          // Manually trigger change detection
          this.cdr.detectChanges();
        }else{
          //alert("NO EXISTE COINCIDENCIA EN LA BUSQUEDA");
          this.toast.error("Validación","No hay coincidencia en al búsqueda");
        }
      }
    });    
  }

  limpiarBusquedaClientes() {
    //console.log("limpiando clientes....");
    this.code_client = '';
    this.n_document_client = '';
    this.surname_client = '';
    this.client_id = '';
    this.CLIENT_SELECTED = '';
  }

  openSelectedClients(clients:any=[]){
    const modalRef = this.modalService.open(SearchClientsComponent,{size:'lg',centered:true});
    // Paso lista de clientes
    // Debo declarar @Input() clientes en el modal
    modalRef.componentInstance.clientes = clients;

    // Recibo el valor del componente hijo
    modalRef.componentInstance.ClientSelected.subscribe((client:any) => {
      //console.log(client);
      this.CLIENT_SELECTED = client;
      this.client_id = this.CLIENT_SELECTED.id;
      this.code_client = this.CLIENT_SELECTED.code;
      this.n_document_client = this.CLIENT_SELECTED.n_document+"/"+this.CLIENT_SELECTED.cuit;
      this.surname_client = this.CLIENT_SELECTED.surname+"/"+this.CLIENT_SELECTED.razon_social;
      this.toast.success("Exito","Se selecciono el cliente");
      this.cdr.detectChanges();
    });
  }
}
