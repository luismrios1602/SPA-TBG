import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-seleccion-p2',
  templateUrl: './card-seleccion-p2.component.html',
  styleUrls: ['./card-seleccion-p2.component.css']
})
export class CardSeleccionP2Component implements OnInit {

  playername:String = "CPU";
  constructor() { }

  ngOnInit(): void {
  }

}
