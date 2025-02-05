import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroContatoComponent } from './cadastro-contato.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { provideNgxMask } from 'ngx-mask'; // ✅ Import da máscara
import { of } from 'rxjs';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';

describe('CadastroContatoComponent', () => {
  let component: CadastroContatoComponent;
  let fixture: ComponentFixture<CadastroContatoComponent>;
  let contatoServiceSpy: jasmine.SpyObj<ContatoService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    contatoServiceSpy = jasmine.createSpyObj('ContatoService', ['cadastrarContato']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [
        CadastroContatoComponent, 
        ReactiveFormsModule,   
      ],
      providers: [
        { provide: ContatoService, useValue: contatoServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
        provideHttpClientTesting(),
        provideNgxMask()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário corretamente', () => {
    expect(component.contatoForm).toBeDefined();
    expect(component.contatoForm.invalid).toBeTrue();
  });

  it('deve validar o formulário corretamente', () => {
    component.contatoForm.setValue({
      nome: 'Maria',
      email: 'maria@gmail.com',
      celular: '11999999999',
      telefone: '',
      favorito: false
    });

    expect(component.contatoForm.valid).toBeTrue();
  });

  it('não deve chamar o serviço se o formulário for inválido', () => {
    component.contatoForm.setValue({
      nome: '',
      email: '',
      celular: '',
      telefone: '',
      favorito: false
    });

    component.cadastrar();

    expect(contatoServiceSpy.cadastrarContato).not.toHaveBeenCalled();
    expect(toastrSpy.error).toHaveBeenCalledWith('Erro ao cadastrar contato. Verifique os dados e tente novamente.', 'Erro');
  });

  it('deve chamar o serviço e exibir mensagem de sucesso ao cadastrar um contato válido', () => {
    contatoServiceSpy.cadastrarContato.and.returnValue(of({}));

    component.contatoForm.setValue({
      nome: 'Pedro',
      email: 'pedro@gmail.com',
      celular: '11988887777',
      telefone: '',
      favorito: false
    });

    component.cadastrar();

    expect(contatoServiceSpy.cadastrarContato).toHaveBeenCalled();
    expect(toastrSpy.success).toHaveBeenCalledWith('Contato cadastrado com sucesso!', 'Sucesso');
  });
});
