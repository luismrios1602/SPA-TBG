import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBattleP1Component } from './card-battle-p1.component';

describe('CardBattleP1Component', () => {
  let component: CardBattleP1Component;
  let fixture: ComponentFixture<CardBattleP1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBattleP1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBattleP1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
