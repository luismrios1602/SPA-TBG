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
    
  getPersonajes(){
    return this.http.get<PersonajeModel[]>(this.Url+"/personajes");
  }

  getPersonaje(nombre:String){
    return this.http.get<PersonajeModel>(this.Url+"/personaje/"+nombre);
  }

  atacar(personajes:PersonajeModel[],idPoder:number){
    return this.http.post<PersonajeModel>(this.Url+"/batalla/atacar?idPoder="+idPoder,personajes);
  }

  defender(personaje:PersonajeModel){
    return this.http.post<PersonajeModel>(this.Url+"/batalla/defender",personaje);
  }
  
}
