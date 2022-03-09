import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBattleP2Component } from './card-battle-p2.component';

describe('CardBattleP2Component', () => {
  let component: CardBattleP2Component;
  let fixture: ComponentFixture<CardBattleP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBattleP2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBattleP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
