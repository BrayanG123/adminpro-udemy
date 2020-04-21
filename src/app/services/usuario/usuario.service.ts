import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//Terceros
import Swal from 'sweetalert2';

import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token:string;

  constructor( public http:HttpClient, 
               public router:Router, 
               public _subirArchivoService: SubirArchivoService
  ) { 
    this.cargarStorage();
  }
  
  estaLogeado(){
    return ( this.token.length > 5 )? true : false;
  }

  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      //JSON.parse tal parece que devuelve a su estado origninal
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  logOut(){
    this.usuario = null;
    this.token = '';
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    this.router.navigate(['/login']);
  }

  login( usuario:Usuario, recordarme:boolean = false ){

    if ( recordarme )  localStorage.setItem('email', usuario.email);
    else  localStorage.removeItem('email');

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                    .pipe( map( (resp: any) => {

                      this.guardarStorage(resp.id, resp.token, resp.usuario);
                      
                      return true; //para devolver algo
                    }) );
                
  }

  guardarStorage( id:string, token:string, usuario:Usuario){
    //En el localStorage solo se guardan Strings
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    // JSON.stringify convierte un objeto a un JSON valido en formato string 
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario( usuario:Usuario ){
    let url = URL_SERVICIOS + '/usuario';

    //hay que suscribirse para controlar el error y el exito (lo haremos donde lo ocupemos)
    return this.http.post( url, usuario )
                .pipe( map( (resp: any) => {  
                    Swal.fire({
                      icon: 'success',
                      title: 'Bienvenido',
                      text: 'Usuario creado correctamente',
                      // footer: '<a href>Why do I have this issue?</a>'
                    })
                    return resp.usuario;
                }));
  }

  actualizarUsuario( usuario:Usuario ){
    let url = URL_SERVICIOS + '/usuario/'+ usuario._id;
    url += '?token=' + this.token;


    return this.http.put( url, usuario )
                .pipe( map( (resp: any) => {

                    //en este caso no tenemos el token en la resp (averiguar porque)
                    if ( usuario._id === this.usuario._id ){ //el if es seguridad para actualizar en el perfil (tiene q actualizarse el mismo usuario q se loguea)
                      this.guardarStorage( resp.usuario._id, this.token, resp.usuario )
                    }

                    Swal.fire({
                      icon: 'success',
                      text: 'Usuario actualizado correctamente',
                    });
                    return true;
                } ) );
  }

  cambiarImagen( archivo:File, id:string ){
    this._subirArchivoService.fileUpload( archivo, 'usuarios', id )
            .subscribe( (resp: any) =>{ 

              console.log(resp);
              this.usuario.img = resp.usuario.img;
              Swal.fire({
                icon: 'success',
                // title: 'Realizado',
                text: 'Imagen actualizada correctamente',
              });
              this.guardarStorage( id, this.token, this.usuario);

            } );
            
  }

  cargarUsuarios( desde:number = 0 ){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url ); //asi de sencillo
  }

  buscarUsuarios( termino:string ){
    //localhot:3000/busqueda/coleccion/usuario/termino  <-- el link (es busqueda por nombre)
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;

    return this.http.get( url )
              .pipe( map( (resp: any) => {  //vamos a filtrar la respuesta para q mande solo los usuarios
                  return resp.usuario; //el mio es usuario (sin s)
              } ) )
  
  }
  
  borrarUsuario( usuario: Usuario){
    //localhot:3000/usuario/id/token  <-- link para borrar usuario  
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.delete( url )
                    .pipe( map( resp => {
                      Swal.fire(
                        'Eliminado!',
                        'El usuario ha sido eliminado.',
                        'success'
                      );
                      return true;
                    } ) );
  }
}
