import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaContatoComponent } from './consulta-contato.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContatoService } from '../../services/contato.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

describe('ConsultaContatoComponent', () => {
  let component: ConsultaContatoComponent;
  let fixture: ComponentFixture<ConsultaContatoComponent>;

  beforeEach(async () => {

    const contatoServiceMock = {
      getContatos: jasmine.createSpy('getContatos').and.returnValue(of([]))
    }
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning', 'info']);
    await TestBed.configureTestingModule({
      imports: [ConsultaContatoComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: ContatoService, useValue: contatoServiceMock },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
