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

  /**Nombre del Player que aparecerá en la card (Será modificado desde la vista de selección) */
  playername:String = "CPU 2";
  /**Datos del personaje seleccionado en el Combobox para ser enviado al personajesServices */
  personSelected: PersonajeModel = new PersonajeModel;
  /**Lista para almacenar los personajes que vengan desde la solicitud a la API */
  listPersonajes:PersonajeModel[] = [];
  
  timeLeft: number = 1;
  interval:any;

  /**Variable de  entrada enviada desde la vista de selección para definir si habilitamos o no la Card */
  @Input() isEnableCard:boolean = false;

  /**Variable de salida que se activa cuando se escoja un personaje y envía que el personaje está seleccionado (true) */
  @Output() habilitarBotones = new EventEmitter<boolean>();
  
  /**Elemento que llama al div del cardP2 para habilitarlo o deshabilitarlo */
  @ViewChild("divCardP2",{static: true}) divCardP2!:ElementRef;

  constructor(private servicio:ServicioService, private personajeService:PersonajesService, private render:Renderer2) {


   }

  
  ngOnInit(): void {

    this.personSelected.image = 0;
    this.startTimer();

  }

  /**
   * Método apra iniciar el contador
   */
  startTimer() {

    this.interval = setInterval(async () => {
      if(this.timeLeft > 0) {

        //Vamos reduciendo los segundos hasta llegar a 0
        this.timeLeft--;

      } else {
        
        //Cuando sea 0 el contador, pausamos el contador
        this.pauseTimer();

        //Esperamos recibir los datos de la API con los personajes
        await this.habilitarCard();
        //Tomamos un numero aleatorio de 0 a 4 (Para buscar con ese ID el personsaje a elegir aleatoriamente)
        let idPersonaje :number = Number.parseInt((Math.random() * (4 - 0) + 0).toString());

        //Seleccionamos el personaje en la lista cargada desde la API con el ID aleatorio que nos apareció
        await this.selectPerson(this.listPersonajes[idPersonaje].name.toString());

        //Escogemos el personaje "presionando" automáticamente en el botón de listo, después de seleccionar el personaje (por eso el await de arriba)
        this.escogerPersonaje();
        
      }
    },1000);

  }

  /**
   * Método para detener el contador 
   */
  pauseTimer() {
    clearInterval(this.interval);
  }

/**
   * Método para consultar a la API el tipo de personaje seleccionado en la card de selección
   * Async porque tengo que esperar traer los datos, en este componente todo se hace automático y no puedo hacer varias cosas a la vez
   * @param tipoPerson Nombre del tipo de personaje (Mago, Bruja...)
   */
  async selectPerson(tipoPerson:string){
    const data$ = this.servicio.getPersonaje(tipoPerson);

    data$.subscribe();

    this.personSelected = await firstValueFrom(data$);
  }

  /**
   * Método para escoger el personaje seleccionado con el botón de listo. Habilita los botones de Batallar y Cancelar de la page
   */
  escogerPersonaje(){

    this.personajeService.P2 = this.personSelected;
    this.personajeService.P2.vida = 999;
    this.personajeService.P2.name = this.playername;
    this.habilitarBotones.emit(true);
    
    this.render.addClass(this.divCardP2.nativeElement,"readyCPU2")
  }

  /**
   * Método para habilitar la card de selección P2 
   * Async porque tengo que esperar traer los datos, en este componente todo se hace automático y no puedo hacer varias cosas a la vez 
   */
  async habilitarCard() {

    const data$ = this.servicio.getPersonajes();
    data$.subscribe(data => {
      this.listPersonajes = data;
    });

    this.listPersonajes = await firstValueFrom(data$); //Esperamos que se haga el susbcribe y nos traemos el primer valor
    //this.selectPerson("Mago");

  }



}
  
