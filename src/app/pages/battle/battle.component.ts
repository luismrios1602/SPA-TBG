import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  vidaP1:number = 999;
  vidaP2:number = 999;
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

  constructor(private router:Router,private personajesServices:PersonajesService, private render:Renderer2) { }

  ngOnInit(): void {

    if (this.personajesServices.P1.name==undefined||this.personajesServices.P2.name==undefined) {

      this.router.navigate([""]);

    }else{

      this.vidaP1 = this.personajesServices.P1.vida;
      this.vidaP2 = this.personajesServices.P2.vida;

    }

    this.cambiarTurno(1,0);
  }

  cambiarTurno(newTurno:number,danho:number){

    if (newTurno==1) {

      this.vidaP1 -= danho;
      console.log(this.personajesServices.P1)

      this.render.setValue(this.pbVidaP2.nativeElement,""+this.vidaP2);
      this.turno=1;

      this.render.removeAttribute(this.divP1.nativeElement,"style");
      this.render.setAttribute(this.divP2.nativeElement,"style","pointer-events: none; opacity: 0.5;")

    } else  if (newTurno==2) {

      this.vidaP2 -= danho;

      this.render.setValue(this.pbVidaP2.nativeElement,""+this.vidaP2);
      this.turno = 2;

      this.render.removeAttribute(this.divP2.nativeElement,"style");
      this.render.setAttribute(this.divP1.nativeElement,"style","pointer-events: none; opacity: 0.5;")
    }

    if (this.verificarVictoria()) {
      this.vidaP1 = this.personajesServices.P1.vida;
      this.vidaP2 = this.personajesServices.P2.vida;
      this.personajesServices.P1 = this.player1;
      this.personajesServices.P2 = this.player2;
    }
  }

  //Método para verificar si alguno de los dos ya ganó :v 
  verificarVictoria(){

    this.finishRound = false;

    if (this.vidaP1<=0) {

      this.vidaP1=0;
      this.victoriasP2.push(1);
      this.finishRound = true;
      this.rounds++;

    } else if (this.vidaP2<=0) {
      
      this.vidaP2=0;
      this.victoriasP1.push(1);
      this.finishRound = true;
      this.rounds++;
    }

    return this.finishRound;
  }
}
