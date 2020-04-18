import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Servicios
// import { SettingsService } from './services/settings/settings.service';

// Temporal
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // GraficoDonaComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
