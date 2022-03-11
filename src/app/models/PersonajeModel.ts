export class PersonajeModel{

    name!:String;
    vida!:Number;
    attack!:Number;
    defense!:Number;
    wisdom!:Number;
    luck!:Number;
    danho!:Number; //El daño causado en su turno de ataque
    proteccion!:Number; //La protección adquirida en su turno de defensa
    victorias!:Number; //Las victorias que lleva en la partida (1, 2, o 3)
    image!:Number;

    constructor(){
        
    }
}