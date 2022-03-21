import { PoderModel } from "./PoderModel";

/**
 * Clase para mapear los datos del Personaje extraídos de la API 
 */
export class PersonajeModel{

    "@class"!:String;
    /**Nombre del jugador (Player 1, CPU...) */
    name!:String;
    /**Tipo de personaje (Mago, Burja...) */
    type!:String;
    /**Vida actual del personaje*/
    vida!:number;
    /**Ataque actual del personaje */
    attack!:number;
    /**Defensa actual del personaje */
    defense!:number;
    /**Sabiduría actual del personaje */
    wisdom!:number;
    /**Suerte actual del personaje */
    luck!:number;
    /**Daño causado en el turno de ataque del personaje*/
    danho!:number;
    /**Protección adquirida en el turno de defensa del personaje */ 
    proteccion!:number;
    /**Cantidad de victorias del personaje en la partida actual -- Esta no funcionó pero la dejo para más adelante*/ 
    victorias!:number;
    /**Id de la imagen del personaje */
    image!:number;
    /**Listado de poderes del personaje */
    poderes!:PoderModel[];   //Listado de poderes del personaje

    constructor(){
        
    }
}