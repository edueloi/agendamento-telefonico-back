import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations'; 

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideAnimations(), 
    provideRouter(routes),
    provideToastr({
      timeOut: 3000, 
      positionClass: 'toast-bottom-right', 
      preventDuplicates: true,
      progressBar: true, 
      closeButton: true, 
      easeTime: 300, 
      newestOnTop: true
    }),
  ]
}).catch(err => console.error(err));
