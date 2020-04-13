import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _router:Router ) { }

  ngOnInit(): void {
    init_plugins();
  }

  ingresar(){
    this._router.navigate(['/dashboard']);
  }

}
