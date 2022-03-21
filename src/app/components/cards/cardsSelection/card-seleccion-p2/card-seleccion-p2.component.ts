import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-seleccion-p2',
  templateUrl: './card-seleccion-p2.component.html',
  styleUrls: ['./card-seleccion-p2.component.css']
})
export class CardSeleccionP2Component implements OnInit {

  /**Nombre del Player que aparecerá en la card (Será modificado desde la vista de selección) */
  playername:String = "Player 2";
  /**Datos del personaje seleccionado en el Combobox para ser enviado al personajesServices */
  personSelected: PersonajeModel = new PersonajeModel;
  /**Lista para almacenar los personajes que vengan desde la solicitud a la API */
  listPersonajes:PersonajeModel[] = [];

  /**Variable de salida que se activa cuando se escoja un personaje y envía que el personaje está seleccionado (true) */
  @Output() habilitarBotones = new EventEmitter<boolean>();

  /**Elemento que llama al div del cardP2 para habilitarlo o deshabilitarlo */
  @ViewChild("divCardP2",{static: true}) divCardP2!:ElementRef;

  constructor(
    private servicio:ServicioService,
    private personajeService:PersonajesService, 
    private render:Renderer2) {}

  ngOnInit(): void {

    this.personSelected.image = 0; //Mostrar por defecto el logo del juego
    this.habilitarCard();
  }

  /**
   * Método para consultar a la API el tipo de personaje seleccionado en la card de selección
   * @param tipoPerson Nombre del tipo de personaje (Mago, Bruja...)
   */
  selectPerson(tipoPerson:string){

    this.servicio.getPersonaje(tipoPerson).subscribe(data => {
      this.personSelected = data;
    });

  }

  /**
   * Método para escoger el personaje seleccionado con el botón de listo. Habilita los botones de Batallar y Cancelar de la page
   */
  escogerPersonaje(){
    this.personajeService.P2 = this.personSelected;
    this.personajeService.P2.vida = 999;
    this.personajeService.P2.name = this.playername;
    this.habilitarBotones.emit(true);
    
    this.render.addClass(this.divCardP2.nativeElement,"readyP1")
  }

  /**
   * Habilita la card de selección P2 si el jugador 2 es una persona
   */
  habilitarCard(){
    this.servicio.getPersonajes().subscribe(data => {
      this.listPersonajes = data;
    })
    this.selectPerson("Mago");
  }

  
}
