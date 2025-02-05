import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContatoService } from '../../services/contato.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consulta-contato',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, NgxMaskPipe, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './consulta-contato.component.html',
  styleUrls: ['./consulta-contato.component.scss'],
})

export class ConsultaContatoComponent implements OnInit {
  @ViewChild('modalCadastro') modalCadastro!: ElementRef;
  filtroSelecionado: string = '';
  filtroBusca: string = '';
  contatos: any[] = [];
  contatosFiltrados: any[] = [];
  contatoParaExcluir: any = null;
  ordenacaoAtual: string = 'id';
  contatoEditando: any = null;
  isLoading: boolean = true;
  novoContato!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.carregarContatos();
    this.createForm();
  }

  carregarContatos() {
    this.isLoading = true;
    this.contatoService.getContatos().subscribe(
      (data) => {
        this.contatos = [...data]; 
        this.ordenarContatos(); 
        this.filtrarContatos();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar contatos:', error);
        this.isLoading = false;
      }
    );
  }
  

  salvarNovoContato() {
    if (this.novoContato.valid) {
      const contato = {
        contatoNome: this.novoContato.value.nome,
        contatoEmail: this.novoContato.value.email,
        contatoCelular: this.novoContato.value.celular,
        contatoTelefone: this.novoContato.value.telefone,
        contatoSnFavorito: this.novoContato.value.favorito ? 'S' : 'N',
      };

      this.contatoService.verificarCelular(contato.contatoCelular).subscribe(
        () => {
          this.isLoading = true;
          this.contatoService.cadastrarContato(contato).subscribe(
            () => {
              this.novoContato.reset();
              this.carregarContatos();
              this.fecharModalCadastro();
              this.isLoading = false;
              this.toastr.success('Contato cadastrado com sucesso!', 'Sucesso');
            },
            (error) => {
              this.isLoading = false;
              this.toastr.error('Erro ao cadastrar contato.', 'Erro'); 
            }
          );
        },
        (error) => {
          this.isLoading = false;
          if (error.status === 400) {
            this.toastr.warning(
              error.error || 'Número de celular já cadastrado!',
              'Aviso'
            );
          } else {
            this.toastr.error('Erro ao verificar celular.', 'Erro');
          }
        }
      );
    } else {
      this.toastr.info('Preencha todos os campos obrigatórios corretamente!', 'Atenção' );
    }
  }

  fecharModalCadastro() {
    const modalElement = document.getElementById('cadastrarContatoModal');
    if (modalElement) {
      this.renderer.setStyle(modalElement, 'display', 'none');
      this.renderer.setAttribute(modalElement, 'aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    const backdrops = document.getElementsByClassName('modal-backdrop');
    for (let i = 0; i < backdrops.length; i++) {
      backdrops[i].remove();
    }
  }

  filtrarContatos() {
    this.contatosFiltrados = this.contatos.filter((contato) => {
      const atendeFiltroTexto = this.filtroBusca
        ? contato.contatoNome
            .toLowerCase()
            .includes(this.filtroBusca.toLowerCase()) ||
          contato.contatoCelular.includes(this.filtroBusca)
        : true;

      const atendeFiltroSelecionado =
        this.filtroSelecionado === 'favoritos'
          ? contato.contatoSnFavorito === 'S'
          : this.filtroSelecionado === 'ativos'
          ? contato.contatoSnAtivo === 'S'
          : this.filtroSelecionado === 'inativos'
          ? contato.contatoSnAtivo === 'N'
          : true;

      return atendeFiltroTexto && atendeFiltroSelecionado;
    });

    this.ordenarContatos();
  }

  prepararExclusao(contato: any) {
    this.contatoParaExcluir = contato;
  }

  getMask(value: string): string {
    return value && value.length > 10 ? '(00) 00000-0000' : '(00) 0000-0000';
  } 

  editarContato(contato: any) {
    this.contatoEditando = contato
      ? { ...contato }
      : {
          contatoId: null,
          contatoNome: '',
          contatoEmail: '',
          contatoCelular: '',
          contatoTelefone: '',
        };
  }

  confirmarExclusao() {
    if (this.contatoParaExcluir) {
      this.isLoading = true;
      this.contatoService
        .deletarContato(this.contatoParaExcluir.contatoId)
        .subscribe(
          () => {
            this.isLoading = false;
            this.contatos = this.contatos.filter(
              (contato) =>
                contato.contatoId !== this.contatoParaExcluir.contatoId
            );
            this.filtrarContatos();
            this.toastr.success('Contato excluído com sucesso!', 'Sucesso');
            this.contatoParaExcluir = null;
          },
          (error) => {
            this.isLoading = false;
            this.toastr.error('Erro ao excluir contato.', 'Erro');
          }
        );
    }
  }

  salvarEdicao() {
    if (this.contatoEditando) {
      this.isLoading = true;
      this.contatoService
        .atualizarContato(this.contatoEditando.contatoId, this.contatoEditando).subscribe(
          () => {
            this.isLoading = false;
            this.toastr.success('Contato Editado com sucesso!', 'Sucesso');
            this.carregarContatos();
            this.contatoEditando = null;
          },
          (error) => {
            this.isLoading = false;
            console.error('Erro ao atualizar contato:', error);
          }
        );
    }
  }

  alternarFavorito(contato: any) {
    contato.contatoSnFavorito = contato.contatoSnFavorito === 'S' ? 'N' : 'S';

    this.contatoService.atualizarContato(contato.contatoId, contato).subscribe(
      () => {
        this.contatosFiltrados = [...this.contatos];
      },
      (error) => {
        this.toastr.error('Erro ao atualizar favorito.', 'Erro');
        contato.contatoSnFavorito = contato.contatoSnFavorito === 'S' ? 'N' : 'S';
      }
    );
  }

  alternarAtivoInativo(contato: any) {
    contato.contatoSnAtivo = contato.contatoSnAtivo === 'S' ? 'N' : 'S';

    this.contatoService.atualizarContato(contato.contatoId, contato).subscribe(
      () => {
        this.filtrarContatos();
      },
      (error) => {
        this.toastr.error('Erro ao atualizar status do contato.', 'Erro');
        contato.contatoSnAtivo = contato.contatoSnAtivo === 'S' ? 'N' : 'S';
      }
    );
  }

  ordenarContatos() {
    if (this.ordenacaoAtual === 'id') {
      this.contatosFiltrados.sort((a, b) => a.contatoId - b.contatoId);
    } else if (this.ordenacaoAtual === 'nome') {
      this.contatosFiltrados.sort((a, b) => a.contatoNome.localeCompare(b.contatoNome));
    }
  }  

  alterarOrdenacao(criterio: string) {
    this.ordenacaoAtual = criterio;
    this.ordenarContatos();
  }

  private createForm(): void {
    this.novoContato = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      telefone: [''],
      favorito: [false],
    });
  }
}
