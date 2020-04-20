import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemporal:string | ArrayBuffer;

  constructor( public _usuarioService: UsuarioService ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  //mejor dicho actualizar
  guardar( usuario:Usuario ){
    
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
   
    this._usuarioService.actualizarUsuario( this.usuario )
                  .subscribe( );
  }

  seleccionImagen( archivo: File ){

    if ( !archivo ){
      this.imagenSubir = null;
      return;
    }  

    if ( archivo.type.indexOf('image') < 0 ){ //verificar si lo seleccionado es una imagen
      Swal.fire({
        icon: 'error',
        text: 'Solo imagenes',
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    //Esto es javascript nativo (vanilla)
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal = reader.result;
    //fin javascript

  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
