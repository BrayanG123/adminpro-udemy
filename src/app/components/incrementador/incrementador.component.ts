import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { 
    // console.log('leyendo', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  ngOnInit(): void {
    // console.log('progreso', this.progreso);
  }

  incrementar(){
    if ( this.progreso >= 100 ) {
      this.progreso = 100;
      return;
    } 
      
    this.progreso += 5;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

  decrementar(){
    if ( this.progreso <= 0 )  {
      this.progreso = 0;
      return;
    }

    this.progreso -= 5;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

  onChange( newValue:number ){
    
    // let elementoHTML:any = document.getElementsByName('progreso')[0];

    if ( newValue <= 0 )  {
      this.progreso = 0;
    }else if (newValue >= 100 ) { 
      this.progreso = 100;
    }else if ( newValue == null ){
      this.progreso = 0;
    }

    // elementoHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = newValue;
    console.log(newValue);

    this.cambioValor.emit( this.progreso );
  }

}
