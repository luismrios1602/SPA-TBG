import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonajeModel } from '../models/PersonajeModel';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  
  constructor(private http:HttpClient) { 
    
  }

  Url='http://localhost:8080';
  
  /**
   * Método del servicio para consultar todos los personajes desde la API
   * @returns 
   */
  getPersonajes(){
    return this.http.get<PersonajeModel[]>(this.Url+"/personajes");
  }

  /**
   * Método del servicio para ver la información de un personaje desde la API
   * @param tipo Tipo de personaje
   * @returns Personaje consultado
   */
  getPersonaje(tipo:String){
    return this.http.get<PersonajeModel>(this.Url+"/personaje/"+tipo);
  }

  /**
   * Método del servicio que realiza la acción de atacar en la API
   * @param personajes Lista de personajes en batatalla. El primero de la lista debe ser quien ataca
   * @param idPoder ID del poder que desea lanzar
   * @returns Un personaje con las caracteristicas que le haya dado el poder lanzado, además del valor del daño
   */
  atacar(personajes:PersonajeModel[],idPoder:number){
    return this.http.post<PersonajeModel>(this.Url+"/batalla/atacar?idPoder="+idPoder,personajes);
  }

  /**
   * Método del servicio que realiza la acción de defender de la API
   * @param personaje Personaje que desea defender
   * @returns El mismo personaje con el nuevo valor de la protección
   */
  defender(personaje:PersonajeModel){
    return this.http.post<PersonajeModel>(this.Url+"/batalla/defender",personaje);
  }
  
}
