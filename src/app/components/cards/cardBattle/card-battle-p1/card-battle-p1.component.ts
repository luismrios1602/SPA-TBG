import { Component, OnInit } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-card-battle-p1',
  templateUrl: './card-battle-p1.component.html',
  styleUrls: ['./card-battle-p1.component.css']
})
export class CardBattleP1Component implements OnInit {

  playername = "Player 1";
  player1:PersonajeModel = new PersonajeModel();

  constructor(private personajesServices:PersonajesService) { }

  ngOnInit(): void {
    this.player1 = this.personajesServices.P1;
  }

}
