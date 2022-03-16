import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { CardBattleP1Component } from 'src/app/components/cards/cardBattle/card-battle-p1/card-battle-p1.component';
import { firstValueFrom, Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  //vidaP1:number = 999;
  //vidaP2:number = 999;
  narraccion:String = "¡INICIA LA BATALLA!"
  victoriasP1:number[] = [];
  victoriasP2:number[] = [];
  rounds:number = 1;
  turno:number = 1;
  finishRound:boolean = false;

  //Personajes para almacenar los personajes por defecto y mandarlos al services cuando se reinicie un turno
  player1!:PersonajeModel;
  player2!:PersonajeModel;

  //cardBattleP1!:CardBattleP1Component;
  //cardBattleP2!:CardBattleP1Component;

  @ViewChild("divP1",{static:true}) divP1!: ElementRef;
  @ViewChild("divP2",{static:true}) divP2!: ElementRef;
  @ViewChild("pbVidaP2",{static:true}) pbVidaP2!: ElementRef;
  @ViewChild("pbVidaP1",{static:true}) pbVidaP1!: ElementRef;

  constructor(private router:Router,
              public personajesServices:PersonajesService, 
              private render:Renderer2, 
              private service:ServicioService) { 


              }

  ngOnInit(): void {

    //Encapsulamos en un try si uno de los personajes está vacío para volver a la ventana principal
    try{
      
      if (this.personajesServices.P1.name==undefined||this.personajesServices.P2.name==undefined) {

        this.router.navigate([""]);
  
      } else {
        
        this.player1 = this.personajesServices.P1;
        this.player2 = this.personajesServices.P2;
        //this.vidaP1 = this.personajesServices.P1.vida;
        //this.vidaP2 = this.personajesServices.P2.vida;
  
      }
    } catch{
      this.router.navigate([""]);
    }
    
    //Activamos el cambiar turno para asignarle el turno 1 al P1
    this.asignarTurno(1);
  }


  /**
   * Método para calcular el valor de la agresión y restarlo a la vida del personaje que defiende
   * @param turnoActual --> Turno del personaje que ataca
   * @param playerAtaca --> Objeto con las caracteristicas del personaje que ataca (Viene desde el CardBattle)
   */
  async batallar(turnoActual:number,playerAtaca:PersonajeModel){
    
    if (turnoActual == 1) {
      //Si el turno es el 1 entonces el agresor es el P1

      console.log("Defendiendose...")
      //No defendemos con el P2
      const data$ = this.service.defender(this.personajesServices.P2);

      console.log("Subscribiendose...")
      data$.subscribe(data => {

        console.log("Personaje que defiende enviado desde la API: \n"+"daño: "+data.danho+"\nvida: "+data.vida+"\nataque: "+
                      data.attack+"\ndefensa: "+data.defense+"\nsabiduria: "+data.wisdom+"\nsuerte: "+data.luck);
      
      });

      this.personajesServices.P2 = await firstValueFrom(data$); //Esperamos que se haga el susbcribe y nos traemos el primer valor
      this.personajesServices.P1 = playerAtaca;

      console.log("Agrediendo... ");
      var agresion = this.agredir(this.personajesServices.P1.danho,this.personajesServices.P2.proteccion);

      console.log("Agresión: "+agresion);

      this.narraccion = ("Player1 ("+this.personajesServices.P1.name+") lanza: "+this.personajesServices.P1.danho+" pts de daño!\n"+
                        "Player2 ("+this.personajesServices.P2.name+") defiende con "+this.personajesServices.P2.proteccion+" pts de protección!\n"+
                        "Player2 ("+this.personajesServices.P2.name+") pierde "+agresion+" pts de vida!\n--------------------\n")+this.narraccion;

      this.personajesServices.P2.vida -= agresion;

      console.log("Vida restante del P2: "+this.personajesServices.P2.vida);
      this.asignarTurno(2);

    } else if (turnoActual == 2) {
      //Si el turno es el 2 entonces el agresor es el P2

      console.log("Defendiendose...")
      //No defendemos con el P1
      const data$ = this.service.defender(this.personajesServices.P1);

      console.log("Subscribiendose...")
      data$.subscribe(data => {

        console.log("Personaje que defiende enviado desde la API: \n"+"daño: "+data.danho+"\nvida: "+data.vida+"\nataque: "+
                      data.attack+"\ndefensa: "+data.defense+"\nsabiduria: "+data.wisdom+"\nsuerte: "+data.luck);
      
      });

      this.personajesServices.P1 = await firstValueFrom(data$); //Esperamos que se haga el susbcribe y nos traemos el primer valor
      this.personajesServices.P2 = playerAtaca;

      console.log("Agrediendo... ");
      var agresion = this.agredir(this.personajesServices.P2.danho,this.personajesServices.P1.proteccion);

      this.narraccion = ("Player2 ("+this.personajesServices.P2.name+") lanza: "+this.personajesServices.P2.danho+" pts de daño!\n"+
                        "Player1 ("+this.personajesServices.P1.name+") defiende con "+this.personajesServices.P1.proteccion+" pts de protección!\n"+
                        "Player1 ("+this.personajesServices.P1.name+") pierde "+agresion+" pts de vida!\n--------------------\n")+this.narraccion;

      console.log("Agresión: "+agresion);
      this.personajesServices.P1.vida -= agresion;

      console.log("Vida restante del P1: "+this.personajesServices.P1.vida);
      this.asignarTurno(1);

    }

    if (this.verificarVictoria()) {
      this.personajesServices.P1 = this.player1;
      this.personajesServices.P2 = this.player2;

    }
    
  }


/**
 * Método para calcular 
 * @param newTurno 
 * @param playerAtaca 
 */
  async asignarTurno(newTurno:number){

    //Si el nuevo turno es el 1 es porque el que atacó fue el P2
    if (newTurno==1) {

      //this.render.setValue(this.pbVidaP2.nativeElement,this.vidaP2.toString());
      this.turno=1;
  
      this.render.removeAttribute(this.divP1.nativeElement,"style");
      this.render.setAttribute(this.divP2.nativeElement,"style","pointer-events: none; opacity: 0.5;")

      
      //Sino, si el nuevo turno es 2, es porque el que atacó fue el P1
    } else  if (newTurno==2) {

      //this.render.setValue(this.pbVidaP2.nativeElement,""+this.vidaP2);
      this.turno = 2;
  
      this.render.removeAttribute(this.divP2.nativeElement,"style");
      this.render.setAttribute(this.divP1.nativeElement,"style","pointer-events: none; opacity: 0.5;")
      
    }

  }

  /**
   * Método para verificar si hay un ganador en el turno
   * @returns true o false
   */
  verificarVictoria(): boolean{

    this.finishRound = false;

    if (this.personajesServices.P1.vida <= 0) {

      this.personajesServices.P1.vida = 0;
      this.victoriasP2.push(1);
      this.finishRound = true;
      this.narraccion = "¡VICTORIA PARA Player2 ("+this.personajesServices.P2.name+")!\n"+this.narraccion;
      this.rounds++;
      this.asignarTurno(1);

     } else if (this.personajesServices.P2.vida <= 0) {

        this.personajesServices.P2.vida=0;
        this.victoriasP1.push(1);
        this.finishRound = true;
        this.narraccion = "¡VICTORIA PARA Player1 ("+this.personajesServices.P1.name+")!\n"+this.narraccion;
        this.rounds++;
        this.asignarTurno(2);
        
     } 

    return this.finishRound;
  }

  //Este método es para hacer la resta entre el daño y la protección para asignarle la nueva vida al rival. (Para validar los valores negativos)
  agredir(danho:number, proteccion:number):number {

    var agresion = danho - proteccion;
    
    if (agresion<0) {

      agresion = 0;

    }

    return agresion;
  }

  
}
