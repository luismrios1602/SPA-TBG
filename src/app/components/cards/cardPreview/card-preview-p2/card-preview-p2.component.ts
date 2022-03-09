import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-preview-p2',
  templateUrl: './card-preview-p2.component.html',
  styleUrls: ['./card-preview-p2.component.css']
})
export class CardPreviewP2Component implements OnInit {

  playername:String = "CPU";
  
  constructor() { }

  ngOnInit(): void {
  }

}
