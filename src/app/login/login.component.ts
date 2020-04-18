import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor( public router:Router, public _usuarioService:UsuarioService ) { }

  ngOnInit(): void {
    init_plugins();

    //si el localStorage tira undefined entonces tomara el otro valor
    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 1 )  this.recuerdame = true;
  }

  ingresar( forma:NgForm ){

    if ( forma.invalid )  return;  //solo para estar seguros

    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );
  
    this._usuarioService.login( usuario, forma.value.recuerdame )
                        .subscribe( ok => { //para que se dispare hay que suscribirse
                            this.router.navigate( ['/dashboard'] );;
                        })

    // console.log(forma.valid);
    // console.log(forma.value);
    // this._router.navigate(['/dashboard']);
  }

}
