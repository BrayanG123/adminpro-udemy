import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  // token: string = '';
  totalHospitales: number = 0;

  constructor(
                public http:HttpClient,
                private _usuarioService: UsuarioService,
  ) { 
    this._usuarioService.cargarStorage();
  }

  cargarHospitales( desde: number = 0){
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url )
                .pipe( map ( (resp:any) => {
                  this.totalHospitales = resp.totalHospitales;
                  return resp.hospitales;
                } ) )
  }

  obtenerHospital( id:string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
              .pipe( map ( (resp:any) => {
                return resp.hospital;
              } ) )
  }

  borrarHospital( id:string ){
    // this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url )
                .pipe( map( resp => 
                  Swal.fire({
                    icon: 'success',
                    title: 'Hospital Borrado',
                  })  
                ) );
  }

  crearHospital( nombre:string ){
    let url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre:nombre } )
                .pipe( map( (resp:any) => resp.hospital  ) );
  }

  buscarHospital( termino:string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

    return this.http.get( url )
              .pipe( map( (resp: any) => {  //vamos a filtrar la respuesta para q mande solo los hospitales
                  return resp.hospital; //el mio es hospital (sin s)
              } ) )
  }

  actualizarHospital( hospital:Hospital ){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital )
                .pipe( map( (resp:any) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Hospital Actualizado',
                    text: hospital.nombre
                  });  
                  return resp.hospital;
                } ) );
  }

}
