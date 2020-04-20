import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img:string, tipo:string = 'usuarios' ):any {
    //cambie el valor por defecto de tipo por usuarios (agregue simplemente una 's' al final) 
    //quiza me pueda dar un error con medicos u hospitales hay que ver
    //tal parece que el error esta en el pipe, he notado que no se manda el parametro 'tipo'
    let url = URL_SERVICIOS + '/img';

    if ( !img ){//para retornar la img por defecto pongo cualquier cosa 
      return url + '/usuair/xxxx'; // cualquier link no valido dirige a la img por defecto
    }

    if ( img.indexOf('https') >= 0 ){ //si lleva https entonces es una img de google
      return img;  //ya no haria falta hacer alguna transformacion por eso la devolvemos tal y como esta
    }

    switch (tipo) {
      case 'usuarios':
          url += '/usuarios/' + img;
        break;
      case 'hospitales':
          url += '/hospitales/' + img;
        break;
      case 'medicos':
          url += '/medicos/' + img;
        break;
    
      default:
          console.log('tipo de img no existe, usuarios, medicos, hospitales');
          url += '/usuair/xxxx';
    }

    return url;
  }

}
