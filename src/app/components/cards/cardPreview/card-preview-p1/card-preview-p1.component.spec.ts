import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreviewP1Component } from './card-preview-p1.component';

describe('CardPreviewP1Component', () => {
  let component: CardPreviewP1Component;
  let fixture: ComponentFixture<CardPreviewP1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPreviewP1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPreviewP1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
