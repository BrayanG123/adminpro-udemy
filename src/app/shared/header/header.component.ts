import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario:Usuario;

  constructor( public _usuarioService:UsuarioService ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
