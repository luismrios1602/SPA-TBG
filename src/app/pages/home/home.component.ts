import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

/**
 * 
 * @param router Inyección de dependencias de la clase Router para manejar la navegación en la SPA
 * @param personajesServices Inyección de dependencia de la clase personajesServices para usar los PlayerName globales
 */
  constructor(
    private router:Router, 
    private personajesServices:PersonajesService
  ){ }

  ngOnInit(): void {  }

/**
 * Método para la elección del tipo de partida en la pantalla principal
 * @param modo Texto en el botón escogido
 */
  selectionCharacter(modo:string){
    
    switch (modo) {
      case "PVP":
        /*Si es PVP es porque ambos son Player humano. Asígnamos este nombre a los names del serivicio globlal */
        this.personajesServices.P1Name = "Player 1";
        this.personajesServices.P2Name = "Player 2";
        this.router.navigate(["selection"]);
        break;

      case "PVCPU":
        /*Si es PVCPU es porque es Player humano vs la Máquina (CPU). Para el Player 2 asignamos el nombre de CPU 2*/
        this.personajesServices.P1Name = "Player 1";
        this.personajesServices.P2Name = "CPU 2";
        this.router.navigate(["selection"]);
        break;
        
      default:
        break;
    }
    
  }

}
