import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSeleccionCpu2Component } from './card-seleccion-cpu2.component';

describe('CardSeleccionCpu2Component', () => {
  let component: CardSeleccionCpu2Component;
  let fixture: ComponentFixture<CardSeleccionCpu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSeleccionCpu2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSeleccionCpu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
