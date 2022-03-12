import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  player1:PersonajeModel = new PersonajeModel();

  @Output() atacar = new EventEmitter<number>();
  personajes:PersonajeModel[] = [];

  constructor(private personajesServices:PersonajesService, private service:ServicioService) { }

  ngOnInit(): void {
    this.player1 = this.personajesServices.P1;
    this.personajes = [this.player1,this.personajesServices.P2];
  }

  lanzarPoder1(){
    console.log("lanzando poder 1");

    this.service.atacar(this.personajes,1).subscribe(data =>{
      console.log(data)
        this.player1 = data;
        console.log(this.player1.danho)
      this.atacar.emit(this.player1.danho);

      this.personajesServices.P1 = this.player1;
    });
    
  }

}
