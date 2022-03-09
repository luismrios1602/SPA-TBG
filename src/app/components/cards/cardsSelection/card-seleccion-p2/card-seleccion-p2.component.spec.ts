import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSeleccionP2Component } from './card-seleccion-p2.component';

describe('CardSeleccionP2Component', () => {
  let component: CardSeleccionP2Component;
  let fixture: ComponentFixture<CardSeleccionP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSeleccionP2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSeleccionP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
