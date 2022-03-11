import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  vidaP1:Number = 0;
  vidaP2:Number = 0;
  narraccion:String = "¡INICIA LA BATALLA!"
  victoriasP1:Number[] = [];
  victoriasP2:Number[] = [];
  rounds:Number = 1;

  constructor(private router:Router,private personajesServices:PersonajesService) { }

  ngOnInit(): void {
    if (this.personajesServices.P1.name==undefined||this.personajesServices.P2.name==undefined) {
      this.router.navigate([""]);
    }else{
      this.vidaP1 = this.personajesServices.P1.vida;
      this.vidaP2 = this.personajesServices.P2.vida;
    }
    
  }

}
