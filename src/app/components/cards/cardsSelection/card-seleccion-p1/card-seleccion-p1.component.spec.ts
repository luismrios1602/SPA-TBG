import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSeleccionP1Component } from './card-seleccion-p1.component';

describe('CardSeleccionP1Component', () => {
  let component: CardSeleccionP1Component;
  let fixture: ComponentFixture<CardSeleccionP1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSeleccionP1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSeleccionP1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
