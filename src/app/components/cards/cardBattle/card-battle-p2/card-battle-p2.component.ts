import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-battle-p2',
  templateUrl: './card-battle-p2.component.html',
  styleUrls: ['./card-battle-p2.component.css']
})
export class CardBattleP2Component implements OnInit {

  playername = "Player 2"; //Nombre que aparecerá en la card

  player2!:PersonajeModel;

  @Input() player1!: PersonajeModel;

  @Output() atacar = new EventEmitter<PersonajeModel>(); //Evento que enviará los datos al componente padre (enviará el daño)
  listPersonajes:PersonajeModel[] = []; //Lista de personajes que se enviará al servicio que requiere ambos personajes

  constructor(public personajesServices:PersonajesService, private service:ServicioService) { }

  ngOnInit(): void {

    this.player1	= this.personajesServices.P1;
    this.player2 = this.personajesServices.P2;

    //Cargamos la lista de personajes con el personaje actual y el P2 -> El orden es que el personaje que va primero es el que ataca
    this.listPersonajes = [this.player2,this.player1]; 
  }

  lanzarPoder1(): void{

    console.log("lanzando poder 1");

    this.listPersonajes = [this.player2,this.player1]; 

    this.service.atacar(this.listPersonajes,1).subscribe(data =>{

      console.log("Personaje enviado desde la API: \n"+
                  "vida: "+data.vida+
                  "\nataque: "+data.attack+
                  "\ndefensa: "+data.defense+
                  "\nsabiduria: "+data.wisdom+
                  "\nsuerte: "+data.luck)

      this.player2 = data;

      console.log(this.player1.danho)

      this.atacar.emit(this.player2);

    });
    
  }
}
