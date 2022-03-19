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

  @ViewChild("divCardP1",{static: true}) divCardP1!: ElementRef;
  playername:String = "Player 1";
  personSelected: PersonajeModel = new PersonajeModel;
  listPersonajes:PersonajeModel[] = [];

  
  @Output() habilitarCardP2 = new EventEmitter<boolean>();


  constructor(private servicio:ServicioService, private personajeService:PersonajesService,private render:Renderer2) { }

  ngOnInit(): void {

    this.servicio.getPersonajes().subscribe(data => {
      this.listPersonajes = data;
    });

    this.selectPerson("Mago");

  }

  selectPerson(tipoPerson:string){

    this.servicio.getPersonaje(tipoPerson).subscribe(data => {
      this.personSelected = data;
    });

  }

  escogerPersonaje(){

    this.personajeService.P1 = this.personSelected;
    this.personajeService.P1.vida = 999;
    this.personajeService.P1.name = this.playername;
    this.habilitarCardP2.emit(true);
    this.render.addClass(this.divCardP1.nativeElement,"readyP1");

  }

}
