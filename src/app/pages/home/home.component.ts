import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private router:Router, private personajesServices:PersonajesService){
    
  }

  ngOnInit(): void {
  }


  selectionCharacter(modo:string){
    switch (modo) {
      case "PVP":
        this.personajesServices.P1Name = "Player 1";
        this.personajesServices.P2Name = "Player 2";
        this.router.navigate(["selection"])
        break;

      case "PVCPU":
        this.personajesServices.P1Name = "Player 1";
        this.personajesServices.P2Name = "CPU 2";
        this.router.navigate(["selection"])
        break;
      default:
        break;
    }
    
  }

}
