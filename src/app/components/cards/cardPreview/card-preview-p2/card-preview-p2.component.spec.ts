import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreviewP2Component } from './card-preview-p2.component';

describe('CardPreviewP2Component', () => {
  let component: CardPreviewP2Component;
  let fixture: ComponentFixture<CardPreviewP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPreviewP2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPreviewP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
