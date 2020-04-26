import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  cargando: boolean = false;
  desde: number = 0;

  constructor( public _medicoService: MedicoService, ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos()
          .subscribe( medicos => this.medicos = medicos );
  }

  crearMedico(){

  }

  buscarMedico( termino: string ){

    if ( !termino ) {
      this.cargarMedicos;
      return;
    }

    this._medicoService.buscarMedico( termino )
            .subscribe( ( medicos ) => this.medicos = medicos);
  }

  editarMedico( medico: Medico){

  }

  borrarMedico( medico: Medico){
    this._medicoService.borrarMedico( medico._id )
          .subscribe( () => this.cargarMedicos() );
  }

  cambiarDesde( valor:number ){
    let desde = this.desde + valor;
    // console.log(desde);

    if ( desde >= this._medicoService.totalMedicos) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }

}
