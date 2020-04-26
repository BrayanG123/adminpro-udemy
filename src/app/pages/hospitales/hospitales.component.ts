import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];

  desde: number = 0;
  public cargando: boolean = true;
  // public totalHospitales:number = 0;

  constructor( public _hospitalService: HospitalService, 
               public _modalService: ModalUploadService, //Para actualizar las imagenes
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalService.notificacion
              .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales( this.desde )
            .subscribe( (hospitales: any) => {
                // console.log(hospitales);
                this.hospitales = hospitales;
                this.cargando = false;
                // this.totalHospitales = resp.totalHospitales;
            });
  }  

  obtenerHospital( id:string ){
    this._hospitalService.obtenerHospital( id )
          .subscribe( (resp: Hospital) => {
            console.log(resp);
          })
  }

  borrarHospital( id:string ){
    this._hospitalService.borrarHospital(id)
          .subscribe( () => this.cargarHospitales() );
  }

  crearHospital( ){
    Swal.fire({
      icon: 'info',
      title: 'Crear Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
    }).then( (valor ) => {
      if (!valor.value || valor.value.length === 0) {
        return;
      }
      
      this._hospitalService.crearHospital( valor.value )
            .subscribe( () => this.cargarHospitales() );

    })
  }

  actualizarImagen( hospital: Hospital ){
    this._modalService.mostrarModal( 'hospitales', hospital._id );
  }

  buscarHospital( termino:string ){

    if ( !termino ){
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
                .subscribe( hospitales => this.hospitales = hospitales );
  }

  actualizarHospital( hospital: Hospital){  // o Guardar Hospital <-- segun el video
    this._hospitalService.actualizarHospital( hospital )
                .subscribe();
  }

  cambiarDesde( valor:number ){
    let desde = this.desde + valor;
    // console.log(desde);

    if ( desde >= this._hospitalService.totalHospitales) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales()
  }

}
