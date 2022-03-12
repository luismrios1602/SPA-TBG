import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-battle-p1',
  templateUrl: './card-battle-p1.component.html',
  styleUrls: ['./card-battle-p1.component.css']
})
export class CardBattleP1Component implements OnInit {

  playername = "Player 1";

  @Output() atacar = new EventEmitter<number>();
  listPersonajes:PersonajeModel[] = [];

  constructor(public personajesServices:PersonajesService, private service:ServicioService) { }

  ngOnInit(): void {
    this.listPersonajes = [this.personajesServices.P1,this.personajesServices.P2];
  }

  lanzarPoder1(){
    console.log("lanzando poder 1");

    this.service.atacar(this.listPersonajes,1).subscribe(data =>{

      console.log("Personaje enviado desde la API = "+data)

      this.personajesServices.P1 = data;

      console.log(this.personajesServices.P1.danho)

      this.atacar.emit(this.personajesServices.P1.danho);

    });
  }


}
