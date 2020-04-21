import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemporal:string | ArrayBuffer;

  constructor( 
    public _subirArchivoService: SubirArchivoService, 
    public _modalService:ModalUploadService
  ) { 

  }

  ngOnInit(): void {
  }


  cerrarModal(){
    this.imagenTemporal = null;
    this.imagenSubir = null;

    this._modalService.ocultarModal();
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

  subirImagen(){
    this._subirArchivoService.fileUpload( this.imagenSubir, this._modalService.tipo, this._modalService.id)
          .subscribe( (resp) => {

              this._modalService.notificacion.emit( resp );
              this.cerrarModal();

          } );
  }

}
