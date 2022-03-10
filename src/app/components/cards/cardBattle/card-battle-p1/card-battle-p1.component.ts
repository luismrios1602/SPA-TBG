import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-battle-p1',
  templateUrl: './card-battle-p1.component.html',
  styleUrls: ['./card-battle-p1.component.css']
})
export class CardBattleP1Component implements OnInit {

  playername = "Player 1";
  constructor() { }

  ngOnInit(): void {
  }

}
