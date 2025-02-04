import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        component: LayoutComponent,
        children: [
          { path: 'consulta-contato', loadComponent: () => import('./pages/consulta-contato/consulta-contato.component').then(m => m.ConsultaContatoComponent) },
          { path: 'cadastro-contato', loadComponent: () => import('./pages/cadastro-contato/cadastro-contato.component').then(m => m.CadastroContatoComponent) }
        ]
      }
    ])
  ]
};
