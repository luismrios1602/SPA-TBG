import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  Volver(){
    this.router.navigate([""]);
  }

  Batallar(){
    this.router.navigate(["loading"]);
  }

}
