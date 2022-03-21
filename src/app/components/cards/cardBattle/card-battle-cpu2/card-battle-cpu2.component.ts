import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-battle-cpu2',
  templateUrl: '../card-battle-p2/card-battle-p2.component.html',
  styleUrls: ['./card-battle-cpu2.component.css']
})
export class CardBattleCpu2Component implements OnInit {

  /**Nombre a mostrar en la cardCPU2 */
  playername = this.personajesServices.P2.name; 

  /**Variable de ingreso enviado desde la vista de batalla que define el turno actual */
  @Input() turno !: number;

  /**Evento de salida que emite los datos del P1 cuando se ataca */
  @Output() atacar = new EventEmitter<PersonajeModel>(); 

  /**Lista de personajes de la partida... El que va de primero es el personaje que ataca. */
  listPersonajes:PersonajeModel[] = []; 

  /**Objeto invertal para manipular las acciones del contador */
  interval:any;

  /**Elemento que llama al boton de Poder1 para darle un color diferente al boton del poder 1 (Al azar) */
  @ViewChild("btnPoder1") btnPoder1 !: ElementRef;
  /**Elemento que llama al boton de Poder2 para darle un color diferente al boton del poder 2 (Al azar) */
  @ViewChild("btnPoder2") btnPoder2 !: ElementRef;
  /**Elemento que llama al boton de Poder3 para darle un color diferente al boton del poder 3 (Al azar) */
  @ViewChild("btnPoder3") btnPoder3 !: ElementRef;
  /**Elemento que llama al boton de Poder4 para darle un color diferente al boton del poder 4 (Al azar) */
  @ViewChild("btnPoder4") btnPoder4 !: ElementRef;
  /**Elemento que llama al boton de Poder5 para darle un color diferente al boton del poder 5 (Al azar) */
  @ViewChild("btnPoder5") btnPoder5 !: ElementRef;
  
  constructor(
    public personajesServices:PersonajesService, 
    private service:ServicioService, 
    private  router:Router,
    private render:Renderer2) {

   }

  ngOnInit(): void {

    //Apenas inicie el componente ponemos a correr el contador
    this.startTimer();

    //Cargamos la lista de personajes con el personaje actual y el P1 -> El orden es que el personaje que va primero es el que ataca
    this.listPersonajes = [this.personajesServices.P2,this.personajesServices.P1]; 
    
  }

  /**
   * Método para iniciar el contador
  */
  startTimer() {

    this.interval = setInterval(async () => {

      if(this.turno == 2 ) {
        
        //Consultamos constantemente (cada 3 segundos) si es el turno del P2 y si es así, activamos el seleccionar poder
          this.selectPoder();
        
      }
    },3000);

  }

  /**
   * Método para detener el contador
   */
  pauseTimer() {
    clearInterval(this.interval);
  }

  /**
   * Método para seleccionar aletoriamente el poder a utilizar por el CPU2
   */
  selectPoder(){

    let idPoder = Number.parseInt((Math.random() * (5 - 1) + 1).toString());

    this.lanzarPoder(idPoder);

      switch (idPoder) {   
        /**
         * Dependiendo del poder seleccionado,
         * le damos un color diferente con la clase del css al botón del poder
         * Y le quitamos la clase a los demás botones para que quede diferente solo el seleccionado
         */
          case 1:

            this.render.addClass(this.btnPoder1.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder2.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder3.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder4.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder5.nativeElement,"poderSelected");
            break;

          case 2:

            this.render.addClass(this.btnPoder2.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder1.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder3.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder4.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder5.nativeElement,"poderSelected");
            break;

          case 3:

            this.render.addClass(this.btnPoder3.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder1.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder2.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder4.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder5.nativeElement,"poderSelected");
            break;

          case 4:

            this.render.addClass(this.btnPoder4.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder1.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder2.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder3.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder5.nativeElement,"poderSelected");
            break;

          case 5:

            this.render.addClass(this.btnPoder5.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder1.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder2.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder3.nativeElement,"poderSelected");
            this.render.removeClass(this.btnPoder4.nativeElement,"poderSelected");
            break;
          
          default:
            break;
      }
  }

  /**
   * Método que activa el método atacar de la API y recibe el mismo personaje con el nuevo valor del daño
   * Async porque debo esperar los datos recibidos desde la API para continuar
   * @param idPoder Id del poder a lanzar, enviado desde el botón elegido
   */
  async lanzarPoder(idPoder:number): Promise<void>{

    console.log("lanzando poder "+idPoder);

    //Asigno la lista de los players a enviar a la API (Primero el que ataca)
    this.listPersonajes = [this.personajesServices.P2,this.personajesServices.P1]; 

    console.log("Enviando ataque P2")
    const data$ = this.service.atacar(this.listPersonajes,idPoder);

    console.log("Suscribiendose");
    //Nos suscribimos para recibir los datos y asignarlos a la variable
    data$.subscribe(data => 
      console.log("Personaje enviado desde la API: \n"+
                  "daño: "+data.danho+
                  "\nvida: "+data.vida+
                  "\nataque: "+data.attack+
                  "\ndefensa: "+data.defense+
                  "\nsabiduria: "+data.wisdom+
                  "\nsuerte: "+data.luck)
    );

    //Guardamos en el servicio de personajes el P2 que venga con el valor del daño generado
    this.personajesServices.P2 = await firstValueFrom(data$);

    console.log("Daño generado: "+this.personajesServices.P2.danho)

    //Emitimos el personaje 2 para activar el método batallar en la vista de batalla
    this.atacar.emit(this.personajesServices.P2);
    
  }

  /**
   * Método para abandonar la partida :'v
   */
  Abandonar(){

    alert(this.personajesServices.P2.name+" ha abandonado la partida, severa loca.");
    this.router.navigate([""]);

  }

}

