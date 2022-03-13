import { Injectable } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  P1!:PersonajeModel;
  P2!:PersonajeModel;

  constructor() {
    
   }
}
