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

  playername:String = "Player 2";
  personSelected: PersonajeModel = new PersonajeModel;
  listPersonajes:PersonajeModel[] = [];

  @Input() isEnableCard:boolean = false;
  @Output() habilitarBotones = new EventEmitter<boolean>();

  @ViewChild("divCardP2",{static: true}) divCardP2!:ElementRef;

  constructor(private servicio:ServicioService, private personajeService:PersonajesService, private render:Renderer2) {


   }

  ngOnInit(): void {
    
    this.habilitarCard();
  }

  selectPerson(tipoPerson:string){
    this.servicio.getPersonaje(tipoPerson).subscribe(data => {
      this.personSelected = data;
    });
  }

  escogerPersonaje(){
    this.personajeService.P2 = this.personSelected;
    this.personajeService.P2.vida = 999;
    this.personajeService.P1.name = this.playername;
    this.habilitarBotones.emit(true);
    
    this.render.addClass(this.divCardP2.nativeElement,"readyP1")
  }

  habilitarCard(){
    this.servicio.getPersonajes().subscribe(data => {
      this.listPersonajes = data;
    })
    this.selectPerson("Mago");
  }

  
}
