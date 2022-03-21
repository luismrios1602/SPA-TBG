import { Component, OnInit } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-card-preview-p1',
  templateUrl: './card-preview-p1.component.html',
  styleUrls: ['./card-preview-p1.component.css']
})
export class CardPreviewP1Component implements OnInit {

    /**Nombre del P1 que aparecerá en la card (Se modifica en la vista dependiendo al nombre del personajesServices.P1.name) */
  playername:String = "Player 1";
    /**Objeto local que almacenará el P1 seleccionado */
  player1:PersonajeModel = new PersonajeModel();

  constructor(private personajesService:PersonajesService) { }

  ngOnInit(): void {
    this.player1 = this.personajesService.P1;
    this.playername = this.player1.name;
  }

}
