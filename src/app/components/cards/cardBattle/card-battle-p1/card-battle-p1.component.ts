import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-card-battle-p1',
  templateUrl: './card-battle-p1.component.html',
  styleUrls: ['./card-battle-p1.component.css']
})
export class CardBattleP1Component implements OnInit {

  playername = "Player 1";
  player1!:PersonajeModel;

  @Input() player2!: PersonajeModel;

  @Output() atacar = new EventEmitter<PersonajeModel>();
  
  listPersonajes:PersonajeModel[] = [];

  constructor(public personajesServices:PersonajesService, private service:ServicioService) { }

  ngOnInit(): void {
    this.player1	= this.personajesServices.P1;
    this.player2 = this.personajesServices.P2;

    this.listPersonajes = [this.player1,this.player2];
  }

  lanzarPoder1(){
    console.log("lanzando poder 1");

    this.listPersonajes = [this.player1,this.player2];

    this.service.atacar(this.listPersonajes,1).subscribe(data =>{

      console.log("Personaje enviado desde la API: \n"+
                  "vida: "+data.vida+
                  "\nataque: "+data.attack+
                  "\ndefensa: "+data.defense+
                  "\nsabiduria: "+data.wisdom+
                  "\nsuerte: "+data.luck)

      this.player1 = data;

      console.log(this.player1.danho)

      this.atacar.emit(this.player1);

    });
  }


}
