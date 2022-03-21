import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

    //Al inicial el componente, iniciamos el contador para esperar los segundos colocados
    this.startTimer(); 

  }

  timeLeft: number = 2; //Segundos a esperar
  interval:any; //Intervalo de tiempo a asignar en milisegundos

  /**
   * Método para inciar el contador
   */
  startTimer() {

    this.interval = setInterval(() => {

      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
        this.router.navigate(["battle"]);
      }
      
    },1000);
    
  }

  /**
   * Método para detener el contador
   */
  pauseTimer() {

    //Limpiamos el intervalo y esto lo reincia
    clearInterval(this.interval);

  }

}
