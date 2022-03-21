import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-seleccion-p1',
  templateUrl: './card-seleccion-p1.component.html',
  styleUrls: ['./card-seleccion-p1.component.css']
})
export class CardSeleccionP1Component implements OnInit {

  /**Nombre del Player que aparecerá en la card (Será modificado desde la vista de selección) */
  playername:String = "Player 1";
  /**Datos del personaje seleccionado en el Combobox para ser enviado al personajesServices */
  personSelected: PersonajeModel = new PersonajeModel;
  /**Lista para almacenar los personajes que vengan desde la solicitud a la API */
  listPersonajes:PersonajeModel[] = [];

  /**Variable de salida que se activa cuando se escoja un personaje y envía que el personaje está seleccionado (true) */
  @Output() habilitarCardP2 = new EventEmitter<boolean>();

  /**Elemento que llama al div del cardP1 para darle la clase Ready*/
  @ViewChild("divCardP1",{static: true}) divCardP1!: ElementRef;

  constructor(private servicio:ServicioService, private personajeService:PersonajesService,private render:Renderer2) { }

  ngOnInit(): void {

    this.personSelected.image = 0; //Mostrar por defecto el logo del juego
    
    //Al inciar el componente buscamos los personajes desde la API
    this.servicio.getPersonajes().subscribe(data => {
      this.listPersonajes = data;
    });

    this.selectPerson("Mago");

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

    this.personajeService.P1 = this.personSelected;
    this.personajeService.P1.vida = 999;
    this.personajeService.P1.name = this.playername;
    this.habilitarCardP2.emit(true);
    this.render.addClass(this.divCardP1.nativeElement,"readyP1");

  }

}
