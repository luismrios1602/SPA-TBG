import { Component, OnInit } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-card-preview-p2',
  templateUrl: './card-preview-p2.component.html',
  styleUrls: ['./card-preview-p2.component.css']
})
export class CardPreviewP2Component implements OnInit {

  /**Nombre del P2 que aparecerá en la card (Se modifica en la vista dependiendo al nombre del personajesServices.P2.name) */
  playername:String = "Player 2";
  /**Objeto local que almacenará el P2 seleccionado */
  player2:PersonajeModel = new PersonajeModel();

  constructor(private personajesService:PersonajesService) { }

  ngOnInit(): void {
    this.player2 = this.personajesService.P2;
    this.playername = this.player2.name;
  }

}
