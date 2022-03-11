import { Component, OnInit } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-card-battle-p2',
  templateUrl: './card-battle-p2.component.html',
  styleUrls: ['./card-battle-p2.component.css']
})
export class CardBattleP2Component implements OnInit {

  playername="Player 2";
  player2:PersonajeModel = new PersonajeModel();

  constructor(private personajesServices:PersonajesService) { }

  ngOnInit(): void {
    this.player2 = this.personajesServices.P2;
  }

}
