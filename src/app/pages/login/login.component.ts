import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService, 
    private toastr: ToastrService,
    private router: Router
) {}

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      this.authService.login('fake-jwt-token');
      this.router.navigate(['/consulta-contato']);
    } else {
        this.toastr.error('Usuário ou senha inválidos!', 'Erro');
    }
  }
}
