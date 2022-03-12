import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-battle-p2',
  templateUrl: './card-battle-p2.component.html',
  styleUrls: ['./card-battle-p2.component.css']
})
export class CardBattleP2Component implements OnInit {

  playername = "Player 2"; //Nombre que aparecerá en la card
  player2:PersonajeModel = new PersonajeModel(); //Personaje del player2 actual

  @Output() atacar = new EventEmitter<number>(); //Evento que enviará los datos al componente padre (enviará el daño)
  listPersonajes:PersonajeModel[] = []; //Lista de personajes que se enviará al servicio que requiere ambos personajes

  constructor(private personajesServices:PersonajesService, private service:ServicioService) { }

  ngOnInit(): void {
    this.player2 = this.personajesServices.P2; //Al iniciar cargamos el personaje actual con el personaje P2 del servicio
    this.listPersonajes = [this.player2,this.personajesServices.P1]; //Cargamos la lista de personajes con el personaje actual y el P1 -> El orden es que el personaje que va primero es el que ataca
  }

  lanzarPoder1(){
    console.log("lanzando poder 1");

    this.service.atacar(this.listPersonajes,1).subscribe(data =>{
      console.log(data)
        this.player2 = data;
        console.log(this.player2.danho)
      this.atacar.emit(this.player2.danho); //Aquí emitimos el daño generado desde la API

      this.personajesServices.P2 = this.player2; //Actualizamos el P2
    });
    
  }
}
