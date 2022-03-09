import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-preview-p1',
  templateUrl: './card-preview-p1.component.html',
  styleUrls: ['./card-preview-p1.component.css']
})
export class CardPreviewP1Component implements OnInit {

  playername:String = "Player1";
  constructor() { }

  ngOnInit(): void {
  }

}
