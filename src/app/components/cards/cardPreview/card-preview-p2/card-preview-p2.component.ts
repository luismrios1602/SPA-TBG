import { Component, OnInit } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-card-preview-p2',
  templateUrl: './card-preview-p2.component.html',
  styleUrls: ['./card-preview-p2.component.css']
})
export class CardPreviewP2Component implements OnInit {

  playername:String = "Player 2";
  player2:PersonajeModel = new PersonajeModel();

  constructor(private personajesService:PersonajesService) { }

  ngOnInit(): void {
    this.player2 = this.personajesService.P2;
    this.playername = this.player2.name;
  }

}
