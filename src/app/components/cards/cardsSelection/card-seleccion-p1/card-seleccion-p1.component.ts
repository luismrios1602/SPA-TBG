import { Component, OnInit } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-seleccion-p1',
  templateUrl: './card-seleccion-p1.component.html',
  styleUrls: ['./card-seleccion-p1.component.css']
})
export class CardSeleccionP1Component implements OnInit {

  playername:String = "Player 1";
  personSelected: PersonajeModel = new PersonajeModel;
  listPersonajes:PersonajeModel[] = [];


  constructor(private servicio:ServicioService) { }

  ngOnInit(): void {
    this.servicio.getPersonajes().subscribe(data => {
      this.listPersonajes = data;
    })
    this.selectPerson("Mago");
  }

  selectPerson(tipoPerson:string){
    this.servicio.getPersonaje(tipoPerson).subscribe(data => {
      this.personSelected = data;
    });
  }

}
