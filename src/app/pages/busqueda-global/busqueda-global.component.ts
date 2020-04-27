import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda-global',
  templateUrl: './busqueda-global.component.html',
  styles: []
})
export class BusquedaGlobalComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor( public activatedRoute:ActivatedRoute, //para recibir los parametros ¿del link?
               public http:HttpClient,
  ) { 
    activatedRoute.params
          .subscribe( params => {
            let termino = params['termino'];
            this.buscar( termino );
          } );
  }

  ngOnInit(): void {
  }

  buscar( termino:string ){

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url )
             .subscribe( (resp:any) => {
               console.log(resp);
               this.usuarios = resp.usuarios;
               this.hospitales = resp.hospitales;
               this.medicos = resp.medicos;
             });

  }

}
