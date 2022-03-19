import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBattleCpu2Component } from './card-battle-cpu2.component';

describe('CardBattleCpu2Component', () => {
  let component: CardBattleCpu2Component;
  let fixture: ComponentFixture<CardBattleCpu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBattleCpu2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBattleCpu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
