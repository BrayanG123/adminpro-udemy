import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { URL_SERVICIOS } from 'src/app/config/config';



@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor( public http:HttpClient ) { }

  fileUpload(fileItem: File, tipo: string, id: string) {

    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
    const formData: FormData = new FormData();

    formData.append('imagen', fileItem, fileItem.name);

    return this.http.put(url, formData, { reportProgress: true });
    
  }


}
