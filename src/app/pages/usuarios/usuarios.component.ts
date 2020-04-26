import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _usuarioServices:UsuarioService,
               public _modalService: ModalUploadService,  
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalService.notificacion
          .subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal( id:string ){
    this._modalService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(){
    this._usuarioServices.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {
                // console.log(resp);
                this.usuarios = resp.usuarios;
                this.totalRegistros = resp.totalUsuarios;
                this.cargando = false;
              })
  }

  cambiarDesde( valor:number ){
    let desde = this.desde + valor;
    // console.log(desde);

    if ( desde >= this.totalRegistros) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios()
  }

  buscarUsuario( termino:string ){
    // console.log(termino);

    if ( !termino ){
      this.cargarUsuarios();
    }
    this.cargando = true;

    this._usuarioServices.buscarUsuarios( termino )
          .subscribe( (usuarios: Usuario[]) => {

              console.log(usuarios);
              this.usuarios = usuarios;
              this.cargando = false;
          } )
  }

  borrarUsuario( usuario: Usuario){
    // console.log(usuario);

    if (usuario._id === this._usuarioServices.usuario._id){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes borrarte a ti mismo',
      });
      return;
    }
    
    
    Swal.fire({
      title: 'Estas seguro?',
      text: "Estas seguro de borrar a "+ usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Seguro!'
    }).then((result) => {

      if (result.value) {
        this._usuarioServices.borrarUsuario( usuario )
              .subscribe( resp => { //la resp es un boolean 
                console.log(resp);

                this.totalRegistros--;
                if ( this.desde === this.totalRegistros ) this.desde -= 5; //para evitar el error de quedarse en blanco tras borrar un unico usuario en una paginacion

                this.cargarUsuarios();
              } );  
      }

    })
  }

  guardarUsuario( usuario:Usuario ){
    this._usuarioServices.actualizarUsuario( usuario )
            .subscribe();
  }

}
