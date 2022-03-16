import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { CardBattleP1Component } from 'src/app/components/cards/cardBattle/card-battle-p1/card-battle-p1.component';
import { firstValueFrom, Observable } from 'rxjs';

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

  player1!:PersonajeModel;
  player2!:PersonajeModel;

  cardBattleP1!:CardBattleP1Component;
  cardBattleP2!:CardBattleP1Component;

  @ViewChild("divP1",{static:true}) divP1!: ElementRef;
  @ViewChild("divP2",{static:true}) divP2!: ElementRef;
  @ViewChild("pbVidaP2",{static:true}) pbVidaP2!: ElementRef;
  @ViewChild("pbVidaP1",{static:true}) pbVidaP1!: ElementRef;

  constructor(private router:Router,
              private personajesServices:PersonajesService, 
              private render:Renderer2, 
              private service:ServicioService) { 


              }

  ngOnInit(): void {

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
    

    //this.cambiarTurno(1,this.player2);
  }

  async cambiarTurno(newTurno:number,playerAtaca:PersonajeModel){

    //Si el nuevo turno es el 1 es porque el que atacó fue el P2
    if (newTurno==1) {

      this.player2 = playerAtaca;

      console.log("Defendiendose...")
      //No defendemos con el P1 
      const data$ = this.service.defender(this.player1);

      console.log("Subscribiendose")
      data$.subscribe(data => {
        console.log("Personaje enviado desde la API: \n"+
                    "daño: "+data.danho+
                    "\nvida: "+data.vida+
                    "\nataque: "+data.attack+
                    "\ndefensa: "+data.defense+
                    "\nsabiduria: "+data.wisdom+
                    "\nsuerte: "+data.luck)
      });

      this.player1 = await firstValueFrom(data$);

      console.log("Agrediendo... ");
      var agresion = this.agredir(playerAtaca.danho,this.player1.proteccion);
      console.log("Agresión: "+agresion);
      this.player1.vida -= agresion;

      //this.render.setValue(this.pbVidaP2.nativeElement,this.vidaP2.toString());
      this.turno=1;
  
      this.render.removeAttribute(this.divP1.nativeElement,"style");
      this.render.setAttribute(this.divP2.nativeElement,"style","pointer-events: none; opacity: 0.5;")

      if (this.verificarVictoria()) {
        //this.vidaP1 = this.personajesServices.P1.vida;
        //this.vidaP2 = this.personajesServices.P2.vida;
        alert("Termina el turno. \n"
            +"Vida del P1 service: "+this.personajesServices.P1.vida);
        this.player1 = this.personajesServices.P1;
        this.player2 = this.personajesServices.P2;
      }
     
      //Sino, si el nuevo turno es 2, es porque el que atacó fue el P1
    } else  if (newTurno==2) {

      this.player1 = playerAtaca;

      console.log("Defendiendose...")
      //No defendemos con el P2 -> Como no sé esperar en el suscribe, entonces toca meter todo el código dentro
      const data$ = this.service.defender(this.player2);

      console.log("Suscribiendose")
      data$.subscribe(data => {
        console.log("Personaje defensa enviado desde la API: \n"+
                    "proteccion: "+data.proteccion+
                    "\nvida: "+data.vida+
                    "\nataque: "+data.attack+
                    "\ndefensa: "+data.defense+
                    "\nsabiduria: "+data.wisdom+
                    "\nsuerte: "+data.luck)

      });

      this.player2 = await firstValueFrom(data$);

      console.log("Agrediendo... ");
      var agresion = this.agredir(playerAtaca.danho,this.player2.proteccion);
      console.log("Agreción: "+agresion)
      this.player2.vida -= agresion;

      //this.render.setValue(this.pbVidaP2.nativeElement,""+this.vidaP2);
      this.turno = 2;
  
      this.render.removeAttribute(this.divP2.nativeElement,"style");
      this.render.setAttribute(this.divP1.nativeElement,"style","pointer-events: none; opacity: 0.5;")

      if (this.verificarVictoria()) {
        //this.vidaP1 = this.personajesServices.P1.vida;
        //this.vidaP2 = this.personajesServices.P2.vida;
        
        alert("Termina el turno. \n"
            +"Vida del P1 service: "+this.personajesServices.P1.vida);

        this.player1 = this.personajesServices.P1;
        this.player2 = this.personajesServices.P2;
      }
      
    }

  }

  /**
   * Método para verificar si hay un ganador en el turno
   * @returns true o false
   */
  verificarVictoria(): boolean{

    this.finishRound = false;

    if (this.player1.vida<=0) {

      this.player1.vida=0;
      this.victoriasP2.push(1);
      this.finishRound = true;
      this.rounds++;

    } else if (this.player2.vida<=0) {
      
      this.player2.vida=0;
      this.victoriasP1.push(1);
      this.finishRound = true;
      this.rounds++;
    }

    return this.finishRound;
  }

  //Este método es para hacer la resta entre el daño y la protección para asignarle la nueva vida al rival. (Para validar los valores negativos)
  agredir(danho:number, proteccion:number):number {

    var agresion = danho - proteccion;
    
    if (agresion<0) {

      agresion = 0;

    }

    alert("Daño: "+danho+" | Protección: "+proteccion+" = Agresion: "+agresion)
    return agresion;
  }
}
