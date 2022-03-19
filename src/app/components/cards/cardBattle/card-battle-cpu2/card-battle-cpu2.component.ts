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

  playername = this.personajesServices.P2.name; //Nombre que aparecerá en la card

  @Input() turno !: number;

  @Output() atacar = new EventEmitter<PersonajeModel>(); //Evento que enviará los datos al componente padre (enviará el daño)
  listPersonajes:PersonajeModel[] = []; //Lista de personajes que se enviará al servicio que requiere ambos personajes

  interval:any;

  @ViewChild("btnPoder1") btnPoder1 !: ElementRef;
  @ViewChild("btnPoder2") btnPoder2 !: ElementRef;
  @ViewChild("btnPoder3") btnPoder3 !: ElementRef;
  @ViewChild("btnPoder4") btnPoder4 !: ElementRef;
  @ViewChild("btnPoder5") btnPoder5 !: ElementRef;
  
  constructor(public personajesServices:PersonajesService, private service:ServicioService, private  router:Router, private render:Renderer2) {

   }

  ngOnInit(): void {

    this.startTimer();

    //Cargamos la lista de personajes con el personaje actual y el P1 -> El orden es que el personaje que va primero es el que ataca
    this.listPersonajes = [this.personajesServices.P2,this.personajesServices.P1]; 
    
  }


  startTimer() {

    this.interval = setInterval(async () => {

      if(this.turno == 2 ) {

        let idPoder = Number.parseInt((Math.random() * (5 - 1) + 1).toString());

        this.lanzarPoder(idPoder);

        switch (idPoder) {
          
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
    },3000);

  }

  pauseTimer() {
    clearInterval(this.interval);
  }


  async lanzarPoder(idPoder:number): Promise<void>{

    console.log("lanzando poder "+idPoder);

    this.listPersonajes = [this.personajesServices.P2,this.personajesServices.P1]; 

    console.log("Enviando ataque P2")
    const data$ = this.service.atacar(this.listPersonajes,idPoder);

    console.log("Suscribiendose");
    data$.subscribe(data => 
      console.log("Personaje enviado desde la API: \n"+
                  "daño: "+data.danho+
                  "\nvida: "+data.vida+
                  "\nataque: "+data.attack+
                  "\ndefensa: "+data.defense+
                  "\nsabiduria: "+data.wisdom+
                  "\nsuerte: "+data.luck)
    );

    this.personajesServices.P2 = await firstValueFrom(data$);

    console.log("Daño generado: "+this.personajesServices.P2.danho)

    this.atacar.emit(this.personajesServices.P2);
    
  }

  Abandonar(){

    alert(this.personajesServices.P2.name+" ha abandonado la partida, severa loca.");
    this.router.navigate([""]);

  }

}

