import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-contato',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class CadastroContatoComponent {
  contatoForm!: FormGroup; // Definindo, mas inicializando no createForm()

  constructor(
    private fb: FormBuilder, 
    private contatoService: ContatoService,
    private toastr: ToastrService
  ) {
    this.createForm(); // Chamando o método para inicializar o formulário
  }

  private createForm(): void {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      telefone: [''],
      favorito: [false]
    });
  }

  verificarNumeroAntesDeCadastrar(): void {
    const celular = this.contatoForm.get('celular')?.value;
  
    if (celular) {
      this.contatoService.verificarCelular(celular).subscribe(
        (response) => {
          console.log(response);
          if (response.includes('Contato pode ser cadastrado')) {
            this.cadastrar();
          }
        },
        () => {
          this.toastr.error('Já existe um contato com este número!', 'Erro');
        }
      );
    }
  }
  
  cadastrar(): void {
    if (this.contatoForm.valid) {
      const contato = {
        contatoNome: this.contatoForm.value.nome,
        contatoEmail: this.contatoForm.value.email,
        contatoCelular: this.contatoForm.value.celular,
        contatoTelefone: this.contatoForm.value.telefone,
        contatoSnFavorito: this.contatoForm.value.favorito ? 'S' : 'N'
      };
  
      this.contatoService.cadastrarContato(contato).subscribe(
        () => {
          this.toastr.success('Contato cadastrado com sucesso!', 'Sucesso');
          this.contatoForm.reset();
        },
        () => {
          this.toastr.error('Erro ao cadastrar contato. Verifique os dados e tente novamente.', 'Erro');
        }
      );
    }
  }
}
