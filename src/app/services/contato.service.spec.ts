import { TestBed } from '@angular/core/testing';
import { ContatoService } from './contato.service';
import { provideHttpClient } from '@angular/common/http';

describe('ContatoService', () => {
  let service: ContatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContatoService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(ContatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
