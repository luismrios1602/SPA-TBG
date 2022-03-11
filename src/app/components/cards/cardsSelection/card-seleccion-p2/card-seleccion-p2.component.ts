import { Component, OnInit } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
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
