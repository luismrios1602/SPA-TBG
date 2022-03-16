import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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


  @Output() atacar = new EventEmitter<PersonajeModel>(); //Evento que enviará los datos al componente padre (enviará el daño)
  listPersonajes:PersonajeModel[] = []; //Lista de personajes que se enviará al servicio que requiere ambos personajes

  constructor(public personajesServices:PersonajesService, private service:ServicioService) { }

  ngOnInit(): void {

    //Cargamos la lista de personajes con el personaje actual y el P1 -> El orden es que el personaje que va primero es el que ataca
    this.listPersonajes = [this.personajesServices.P2,this.personajesServices.P1]; 
  }

  async lanzarPoder1(): Promise<void>{

    console.log("lanzando poder 1");

    this.listPersonajes = [this.personajesServices.P2,this.personajesServices.P1]; 

    console.log("Enviando ataque P2")
    const data$ = this.service.atacar(this.listPersonajes,1);

    console.log("Suscribiendose")
    data$.subscribe(data => 
      console.log("Personaje enviado desde la API: \n"+
                  "daño: "+data.danho+
                  "\nvida: "+data.vida+
                  "\nataque: "+data.attack+
                  "\ndefensa: "+data.defense+
                  "\nsabiduria: "+data.wisdom+
                  "\nsuerte: "+data.luck)
    );

    this.personajesServices.P2 = await firstValueFrom(data$);

    console.log("Daño generado: "+this.personajesServices.P2.danho)

    this.atacar.emit(this.personajesServices.P2);
    
  }
}
