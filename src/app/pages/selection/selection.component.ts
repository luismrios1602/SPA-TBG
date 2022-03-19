import { Component, ElementRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  @ViewChild("divBotones") divBotones!: ElementRef;
  P1isSelected:boolean = false;
  P2isSelected:boolean = false;

  isCPU!:boolean;

  constructor(private router:Router, private render:Renderer2, private personajesService:PersonajesService) { }

  ngOnInit(): void {

    if (this.personajesService.P2Name == "Player 2") {

      this.isCPU = false;
      
    } else if (this.personajesService.P2Name == "CPU 2") {

      this.isCPU = true;

    }
  }

  Volver(){
    this.router.navigate([""]);
  }

  Batallar(){

    try {

      if (this.personajesService.P1.name==undefined||this.personajesService.P2.name==undefined) {
        
        alert("Escoger los personajes");

      } else {

        this.router.navigate(["loading"]);
      }

    } catch (error) {

      alert("Escoger los personajes");

    }
    
  }

  Cancelar(){ 

    window.location.reload();

  }

  habilitarBotones(habilitar:boolean){
    this.P2isSelected = habilitar;

    if (this.P2isSelected) {
      
      this.render.removeAttribute(this.divBotones.nativeElement,"style");

    } else {
      //this.render.setAttribute(this.divBotones.nativeElement,"style","pointer-events: none;");
    }
    
  }

  habilitarCardP2(){
      this.P1isSelected=true;
  }

}
