import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-seleccion-cpu2',
  templateUrl: '../card-seleccion-p2/card-seleccion-p2.component.html',
  styleUrls: ['./card-seleccion-cpu2.component.css']
})
export class CardSeleccionCpu2Component implements OnInit {

  playername:String = "CPU 2";
  personSelected: PersonajeModel = new PersonajeModel;
  listPersonajes:PersonajeModel[] = [];
  timeLeft: number = 1;
  interval:any;

  @Input() isEnableCard:boolean = false;
  @Output() habilitarBotones = new EventEmitter<boolean>();

  @ViewChild("divCardP2",{static: true}) divCardP2!:ElementRef;

  constructor(private servicio:ServicioService, private personajeService:PersonajesService, private render:Renderer2) {


   }

  
  ngOnInit(): void {

    this.personSelected.image = 0;
    this.startTimer();

  }

  startTimer() {

    this.interval = setInterval(async () => {
      if(this.timeLeft > 0) {
        this.timeLeft--;

      } else {
        this.pauseTimer();


        await this.habilitarCard();
        let idPersonaje :number = Number.parseInt((Math.random() * (4 - 0) + 0).toString());

        await this.selectPerson(this.listPersonajes[idPersonaje].name.toString());

        this.escogerPersonaje();
        
      }
    },1000);

  }

  pauseTimer() {
    clearInterval(this.interval);
  }


  async selectPerson(tipoPerson:string){
    const data$ = this.servicio.getPersonaje(tipoPerson);

    data$.subscribe();

    this.personSelected = await firstValueFrom(data$);
  }

  
  escogerPersonaje(){

    this.personajeService.P2 = this.personSelected;
    this.personajeService.P2.vida = 999;
    this.personajeService.P2.name = this.playername;
    this.habilitarBotones.emit(true);
    
    this.render.addClass(this.divCardP2.nativeElement,"readyCPU2")
  }

  async habilitarCard() {

    const data$ = this.servicio.getPersonajes();
    data$.subscribe(data => {
      this.listPersonajes = data;
    });

    this.listPersonajes = await firstValueFrom(data$); //Esperamos que se haga el susbcribe y nos traemos el primer valor
    //this.selectPerson("Mago");

  }



}
  
