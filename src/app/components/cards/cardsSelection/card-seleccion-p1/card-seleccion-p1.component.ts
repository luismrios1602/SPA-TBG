import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-seleccion-p1',
  templateUrl: './card-seleccion-p1.component.html',
  styleUrls: ['./card-seleccion-p1.component.css']
})
export class CardSeleccionP1Component implements OnInit {

  playername:String = "Player 1";
  constructor() { }

  ngOnInit(): void {
  }

}
