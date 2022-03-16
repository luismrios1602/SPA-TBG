import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom, Subscriber } from 'rxjs';
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

  @Output() atacar = new EventEmitter<PersonajeModel>();
  
  listPersonajes:PersonajeModel[] = [];

  constructor(public personajesServices:PersonajesService, private service:ServicioService) { }

  ngOnInit(): void {

    this.listPersonajes = [this.personajesServices.P1,this.personajesServices.P2];

  }

  async lanzarPoder1(){

    console.log("Lanzando poder 1");

    this.listPersonajes = [this.personajesServices.P1,this.personajesServices.P2];
    console.log("Personaje que ataca: "+this.personajesServices.P1.vida)
    console.log("Personaje que defiende: "+this.listPersonajes[1].vida)
    
    console.log("Enviando ataque P1")
    const data$ = this.service.atacar(this.listPersonajes,1);
        
    console.log("Suscribiendose")
    data$.subscribe(data => {
      console.log("Personaje que ataca enviado desde la API: \n"+
      "daño: "+data.danho+
      "\nvida: "+data.vida+
      "\nataque: "+data.attack+
      "\ndefensa: "+data.defense+
      "\nsabiduria: "+data.wisdom+
      "\nsuerte: "+data.luck);
      
    });

    this.personajesServices.P1 = await firstValueFrom(data$);

    console.log("Daño generado: "+this.personajesServices.P1.danho)

    this.atacar.emit(this.personajesServices.P1);
    
  }


}
