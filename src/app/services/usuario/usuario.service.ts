import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//Terceros
import Swal from 'sweetalert2';

import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token:string;

  constructor( public htpp:HttpClient, public router:Router ) { 
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
    return this.htpp.post( url, usuario )
                    .pipe( map( (resp: any) => {

                      this.guardarStorange(resp.id, resp.token, resp.usuario);
                      
                      return true; //para devolver algo
                    }) );
                
  }

  guardarStorange( id:string, token:string, usuario:Usuario){
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
    return this.htpp.post( url, usuario )
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

}
