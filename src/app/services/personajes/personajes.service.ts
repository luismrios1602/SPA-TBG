import { Injectable } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';

@Injectable({
  providedIn: 'root'
})

/**Services para almacenar de forma global en la app los personajes actuales de la partida y así manipularlos desde diferentes componentes. */
export class PersonajesService {

  /**Player 1 */
  P1 !: PersonajeModel;
  /**Player 2 */
  P2 !: PersonajeModel;
  
  /**Nombre del Player 1 (Para verificar en la selección si es Persona o CPU) */
  P1Name !: string;
  /**Nombre del Player 2 (Para verificar en la selección si es Persona o CPU) */
  P2Name !: string;

  constructor() {
      
   }
}
