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
    this.startTimer();
  }

  timeLeft: number = 2;
  interval:any;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
        this.router.navigate(["battle"]);
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
