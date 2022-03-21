import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  /**Nombre a mostrar en la cardP1 */
  playername = this.personajesServices.P1.name;

  /**Evento de salida que emite los datos del P1 cuando se ataca */
  @Output() atacar = new EventEmitter<PersonajeModel>();

  /**Variable de salida para activar el método rendirse de la vista de Battle (No está funcionando) */
  @Output() rendirse = new EventEmitter();
  
  /**Lista de personajes de la partida... El que va de primero es el personaje que ataca. */
  listPersonajes:PersonajeModel[] = [];

  constructor(public personajesServices:PersonajesService, private service:ServicioService, private router:Router) { }

  ngOnInit(): void {

    //Cargamos la lista de personajes con el personaje actual y el P2 -> El orden es que el personaje que va primero es el que ataca
    this.listPersonajes = [this.personajesServices.P1,this.personajesServices.P2];

  }

  /**
   * Método que activa el método atacar de la API y recibe el mismo personaje con el nuevo valor del daño
   * Async porque debo esperar los datos recibidos desde la API para continuar
   * @param idPoder Id del poder a lanzar, enviado desde el botón elegido
   */
  async lanzarPoder(idPoder:number){

    console.log("Lanzando poder "+idPoder);

    //Asigno la lista de los players a enviar a la API (Primero el que ataca)
    this.listPersonajes = [this.personajesServices.P1,this.personajesServices.P2];
    console.log("Personaje que ataca: "+this.personajesServices.P1.vida)
    console.log("Personaje que defiende: "+this.listPersonajes[1].vida)
    
    console.log("Enviando ataque P1")
    //Recibimos los datos desde la API
    const data$ = this.service.atacar(this.listPersonajes,idPoder);
        
    console.log("Suscribiendose")
    //Nos suscribimos para recibir los datos y asignarlos a la variable
    data$.subscribe(data => {
      console.log("Personaje que ataca enviado desde la API: \n"+
      "daño: "+data.danho+
      "\nvida: "+data.vida+
      "\nataque: "+data.attack+
      "\ndefensa: "+data.defense+
      "\nsabiduria: "+data.wisdom+
      "\nsuerte: "+data.luck);
      
    });

    //Guardamos en el servicio de personajes el P1 que venga con el valor del daño generado
    this.personajesServices.P1 = await firstValueFrom(data$);

    console.log("Daño generado: "+this.personajesServices.P1.danho)

    //Emitimos el personaje 1 para activar el método batallar en la vista de batalla
    this.atacar.emit(this.personajesServices.P1);
    
  
  }

  /**
   * Método para abandonar la partida :'v
   */
  Abandonar(){
    alert("Player1 ha abandonado la partida, severa loca.");
    this.router.navigate([""]);
  }


}
