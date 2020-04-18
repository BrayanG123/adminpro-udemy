import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public _usuarioServices:UsuarioService, public router: Router ) { }

  sonIguales( campo1:string, campo2:string ){ //validador invocado como personalizado
    return ( group: FormGroup ) =>{ //para que pueda funcionar como validador debe tomar esta estructura
      
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
        
      if ( pass1 === pass2 )  return null; //si se cumple entonces retornar null

      return { sonIguales: true }; //Este es el error que va a impedir que el formulario sea valido
                                   //Así tal como esta en el curso, no me he equivocado al escribir
    }
  }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre    : new FormControl( null, Validators.required ),
      correo    : new FormControl( null, [ Validators.required, Validators.email ] ),
      password  : new FormControl( null, Validators.required ),
      password2 : new FormControl( null, Validators.required ),
      condiciones: new FormControl( false ),
    }, { validators: this.sonIguales( 'password', 'password2' ) }); //validador personalizado
  
    this.forma.setValue({ //para meter valores por defecto y ahorrarme tiempo al probar el registrar
      nombre: 'Test1',
      correo: 'Test1@gmail.com',
      password : '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario(){

    if ( this.forma.invalid )  return; //con esto me saca tras q vea q la forma es invalida
    
    if ( !this.forma.value.condiciones ){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debe aceptar las codiciones',
        // footer: '<a href>Why do I have this issue?</a>'
      })
      return console.log('Debe aceptar las condiciones');
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );


    this._usuarioServices.crearUsuario( usuario ) // si hay un error no dispara el suscribe, sino se va al cacth
        .subscribe( resp => this.router.navigate(['/login']) );


    // console.log('Forma valida: ', this.forma.valid); //si la forma es valida imprimira true
    // console.log(this.forma.value);
  }

}
