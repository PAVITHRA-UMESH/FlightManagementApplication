import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  myimage:string="assets/MyImages/Flight1.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
