import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor( public http:HttpClient,
               public _usuarioService: UsuarioService,
  ) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
            .pipe( map( (resp:any) => {
              this.totalMedicos = resp.totalMedicos;
              return resp.medicos;
            } ) )
  }

  cargarMedico( id:string ){
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url )
            .pipe( map( (resp:any) => resp.medico )) ;
  }

  buscarMedico( termino:string ){
    //localhot:3000/busqueda/coleccion/medico/termino  <-- el link (es busqueda por nombre)
    let url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

    return this.http.get( url )
              .pipe( map( (resp: any) => {  //vamos a filtrar la respuesta para q mande solo los medicos
                  return resp.medico; //el mio es medico (sin s)
              } ) )
  }

  borrarMedico( id: string){
    //localhot:3000/medico/id/token  <-- link para borrar medico  
    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url )
                    .pipe( map( resp => {
                      Swal.fire(
                        'Eliminado!',
                        'El medico ha sido eliminado.',
                        'success'
                      );
                      return true;
                    } ) );
  }

  guardarMedico( medico: Medico ){
    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ){
      //actualizando
      url += '/' + medico._id + '?token=' + this._usuarioService.token;
      return this.http.put( url, medico )
              .pipe( map( (resp:any) => {
                Swal.fire( 'Actualizado!', medico.nombre, 'success' );
                return resp.medico;
              }));

    }else{
      //creando
      url += '?token='  + this._usuarioService.token;
  
      return this.http.post( url, medico )
            .pipe( map((resp: any) => {
              // console.log(resp);
              Swal.fire(
                'Creado!',
                medico.nombre,
                'success'
              );
              return resp.medico;
            }));
    }

  }

}
