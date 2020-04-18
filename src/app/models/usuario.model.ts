export class Usuario {

    // El orden si importa, en parte, por los parametros opcionales
    constructor( public nombre:string,
                 public email:string,
                 public password:string,
                 public img?:string,
                 public role?:string,
                 public google?:boolean,
                 public _id?:string,
    ){
        
    }


}