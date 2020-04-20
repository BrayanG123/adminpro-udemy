
// *** Este modulo es para centralizar los pipes *** 

import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  imports: [],
  declarations: [
    ImagenPipe
  ],
  exports: [  //los pipes que se podran usar fuera de este modulo
    ImagenPipe,
  ]
})
export class PipesModule { }
