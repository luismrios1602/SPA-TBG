import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

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

  player1:PersonajeModel = this.personajesServices.P1;
  player2:PersonajeModel = this.personajesServices.P2;

  @ViewChild("divP1",{static:true}) divP1!: ElementRef;
  @ViewChild("divP2",{static:true}) divP2!: ElementRef;
  @ViewChild("pbVidaP2",{static:true}) pbVidaP2!: ElementRef;
  @ViewChild("pbVidaP1",{static:true}) pbVidaP1!: ElementRef;

  constructor(private router:Router,private personajesServices:PersonajesService, private render:Renderer2, private service:ServicioService) { }

  ngOnInit(): void {

    try{
      
      if (this.personajesServices.P1.name==undefined||this.personajesServices.P2.name==undefined) {

        this.router.navigate([""]);
  
      } else {
  
        //this.vidaP1 = this.personajesServices.P1.vida;
        //this.vidaP2 = this.personajesServices.P2.vida;
  
      }
    } catch{
      this.router.navigate([""]);
    }
    

    this.cambiarTurno(1,this.player1);
  }

  cambiarTurno(newTurno:number,playerAtaca:PersonajeModel){

    //Si el nuevo turno es el 1 es porque el que atacó fue el P2
    if (newTurno==1) {

      this.player2 = playerAtaca;

      //No defendemos con el P1 -> Como no sé esperar en el suscribe, entonces toca meter todo el código dentro
      this.service.defender(this.player1).subscribe(data => {

        //Le restamos a la vida lo que me dé del daño y la proteccion del rival
        //this.vidaP1 -= this.agredir(playerAtaca.danho,data.proteccion);
        this.player1.vida -= this.agredir(playerAtaca.danho,data.proteccion);

        //this.render.setValue(this.pbVidaP2.nativeElement,this.vidaP2.toString());
        this.turno=1;
  
        this.render.removeAttribute(this.divP1.nativeElement,"style");
        this.render.setAttribute(this.divP2.nativeElement,"style","pointer-events: none; opacity: 0.5;")

        if (this.verificarVictoria()) {
          //this.vidaP1 = this.personajesServices.P1.vida;
          //this.vidaP2 = this.personajesServices.P2.vida;
          this.player1 = this.personajesServices.P1;
          this.player2 = this.personajesServices.P2;
        }

      });
     
      //Sino, si el nuevo turno es 2, es porque el que atacó fue el P1
    } else  if (newTurno==2) {

      this.player1 = playerAtaca;

      //No defendemos con el P2 -> Como no sé esperar en el suscribe, entonces toca meter todo el código dentro
      this.service.defender(this.player2).subscribe(data => {

        //Le restamos a la vida lo que me dé del daño y la proteccion del rival
        //this.vidaP2 -= this.agredir(danho,data.proteccion);
        this.player2.vida -= this.agredir(playerAtaca.danho,data.proteccion);

        //this.render.setValue(this.pbVidaP2.nativeElement,""+this.vidaP2);
        this.turno = 2;
  
        this.render.removeAttribute(this.divP2.nativeElement,"style");
        this.render.setAttribute(this.divP1.nativeElement,"style","pointer-events: none; opacity: 0.5;")

        if (this.verificarVictoria()) {
          //this.vidaP1 = this.personajesServices.P1.vida;
          //this.vidaP2 = this.personajesServices.P2.vida;
          this.player1 = this.personajesServices.P1;
          this.player2 = this.personajesServices.P2;
        }

      });
      
    }

  }

  //Método para verificar si alguno de los dos ya ganó :v 
  verificarVictoria(){

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
