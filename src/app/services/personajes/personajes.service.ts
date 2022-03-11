import { Injectable } from '@angular/core';
import { PersonajeModel } from 'src/app/models/PersonajeModel';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  P1:PersonajeModel = new PersonajeModel;
  P2:PersonajeModel = new PersonajeModel;

  constructor() { }
}
