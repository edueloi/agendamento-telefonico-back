import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CadastroContatoComponent } from './pages/cadastro-contato/cadastro-contato.component';
import { ConsultaContatoComponent } from './pages/consulta-contato/consulta-contato.component';
import { EditarContatoComponent } from './pages/editar-contato/editar-contato.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'cadastro-contato', component: CadastroContatoComponent },
      { path: 'consulta-contato', component: ConsultaContatoComponent },
      { path: 'editar-contato', component: EditarContatoComponent },
      { path: 'favoritos', component: FavoritosComponent },
      { path: '', redirectTo: 'consulta-contato', pathMatch: 'full' }
    ]
  }
];
