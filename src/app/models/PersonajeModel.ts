
export class PersonajeModel{

    "@class"!:String;
    name!:String;
    tipo!:String;
    vida!:number;
    attack!:number;
    defense!:number;
    wisdom!:number;
    luck!:number;
    danho!:number; //El daño causado en su turno de ataque
    proteccion!:number; //La protección adquirida en su turno de defensa
    victorias!:number; //Las victorias que lleva en la partida (1, 2, o 3)
    image!:number;

    constructor(){
        
    }
}