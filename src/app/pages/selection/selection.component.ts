import { Component, ElementRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  /**Paramétro para llamar al Div de los botones de Batallar y Cancelar en la vista de selección */
  @ViewChild("divBotones") divBotones!: ElementRef;

  /**Variable para consultar si el P1 ya está ´Listo´ */
  P1isSelected:boolean = false;

  /**Variable para consultar si el P2 ya está ´Listo´ */
  P2isSelected:boolean = false;

  /**Variable para consultar si alguno de los dos player es CPU y es definir qué componente llamar */
  isCPU!:boolean;

  /**
   * 
   * @param router Inyección de dependencias de la clase Router para manejar la navegación en la SPA
   * @param render Inyección de dependencia de la clase Render para llamar elementos del HTML y usarlos en el controlador
   * @param personajesService Inyección de dependencia de la clase personajesServices para usar los PlayerName globales
   */
  constructor(private router:Router, private render:Renderer2, private personajesService:PersonajesService) { }

  ngOnInit(): void {

    if (this.personajesService.P2Name == "Player 2") {

      this.isCPU = false;
      
    } else if (this.personajesService.P2Name == "CPU 2") {

      this.isCPU = true;

    } else {

      this.router.navigate([""]);

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
