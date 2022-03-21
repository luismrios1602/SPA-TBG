import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  playername = this.personajesServices.P2.name; //Nombre que aparecerá en la card

    /**Evento de salida que emite los datos del P2 cuando se ataca */
  @Output() atacar = new EventEmitter<PersonajeModel>(); 

  /**Lista de personajes de la partida... El que va de primero es el personaje que ataca. */
  listPersonajes:PersonajeModel[] = []; 

  constructor(public personajesServices:PersonajesService, private service:ServicioService, private  router:Router) { }

  ngOnInit(): void {

    //Cargamos la lista de personajes con el personaje actual y el P1 -> El orden es que el personaje que va primero es el que ataca
    this.listPersonajes = [this.personajesServices.P2,this.personajesServices.P1]; 
  }

   /**
   * Método que activa el método atacar de la API y recibe el mismo personaje con el nuevo valor del daño
   * Async porque debo esperar los datos recibidos desde la API para continuar
   * @param idPoder Id del poder a lanzar, enviado desde el botón elegido
   */
  async lanzarPoder(idPoder:number): Promise<void>{

    console.log("lanzando poder "+idPoder);

    //Asigno la lista de los players a enviar a la API (Primero el que ataca)
    this.listPersonajes = [this.personajesServices.P2,this.personajesServices.P1]; 

    console.log("Enviando ataque P2")
    //Recibimos los datos desde la API
    const data$ = this.service.atacar(this.listPersonajes,idPoder);

    console.log("Suscribiendose")
    //Nos suscribimos para recibir los datos y asignarlos a la variable
    data$.subscribe(data => 
      console.log("Personaje enviado desde la API: \n"+
                  "daño: "+data.danho+
                  "\nvida: "+data.vida+
                  "\nataque: "+data.attack+
                  "\ndefensa: "+data.defense+
                  "\nsabiduria: "+data.wisdom+
                  "\nsuerte: "+data.luck)
    );

    //Guardamos en el servicio de personajes el P1 que venga con el valor del daño generado
    this.personajesServices.P2 = await firstValueFrom(data$);

    console.log("Daño generado: "+this.personajesServices.P2.danho)

    //Emitimos el personaje 2 para activar el método batallar en la vista de batalla
    this.atacar.emit(this.personajesServices.P2);
    
  }

  /**
   * Método para abandonar la partida :'v
   */
  Abandonar(){
    alert("Player2 ha abandonado la partida, severa loca.");
    this.router.navigate([""]);
  }

  


}
