import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', ''); //para q el select tenga 1 valor al inicializarce
  hospital: Hospital = new Hospital('');

  constructor( public _medicoService: MedicoService,
               public _hospitalService: HospitalService,
               public router:Router,
               public activatedRoute: ActivatedRoute,
               public _modalService: ModalUploadService,
    
  ) { 
    activatedRoute.params.subscribe( params => {
      let id = params['id']; // este nombre depende del nombre del parametro en el archivo de las rutas (tiene q ser el mismo)
    
      if ( id !== 'nuevo'){ //o es nuevo, o es un id
        this.cargarMedico( id );
      }
    });
  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales()
            .subscribe( hospitales => this.hospitales = hospitales );

    this._modalService.notificacion
            .subscribe( resp => {
              // console.log(resp);
              this.medico.img = resp.medico.img;
            })        
  }

  cargarMedico( id:string ){
    this._medicoService.cargarMedico(id)
            .subscribe( medico => { 
              // console.log(medico);
              this.medico = medico;
              this.medico.hospital = medico.hospital._id; 
              this.cambioHospital( this.medico.hospital );
            });
  }

  guardarMedico( f:NgForm ){
    console.log( f.valid );
    console.log(f.value);

    if ( f.invalid )  return;

    this._medicoService.guardarMedico( this.medico )
            .subscribe( medico => {

              this.medico._id = medico._id;
              this.router.navigate(['/medico', medico._id]);

            });
  }

  cambioHospital( id:string ){
    this._hospitalService.obtenerHospital( id )
            .subscribe( hospital => this.hospital = hospital );
  }

  cambiarFoto(){
    this._modalService.mostrarModal( 'medicos', this.medico._id );
  }

}
