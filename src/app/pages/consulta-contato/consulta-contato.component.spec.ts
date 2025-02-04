import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaContatoComponent } from './consulta-contato.component';

describe('ConsultaContatoComponent', () => {
  let component: ConsultaContatoComponent;
  let fixture: ComponentFixture<ConsultaContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
