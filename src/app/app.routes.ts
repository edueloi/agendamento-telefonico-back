import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CadastroContatoComponent } from './pages/cadastro-contato/cadastro-contato.component';
import { ConsultaContatoComponent } from './pages/consulta-contato/consulta-contato.component';
import { EditarContatoComponent } from './pages/editar-contato/editar-contato.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }, 
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'cadastro-contato', component: CadastroContatoComponent, canActivate: [AuthGuard] },
      { path: 'consulta-contato', component: ConsultaContatoComponent, canActivate: [AuthGuard] },
      { path: 'editar-contato', component: EditarContatoComponent, canActivate: [AuthGuard] },
      { path: 'favoritos', component: FavoritosComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'consulta-contato', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
