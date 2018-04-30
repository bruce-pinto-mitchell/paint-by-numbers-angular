import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public name: string = 'Paint By Numbers';
  constructor() {

  }

  ngOnInit() {
    const screenBody = document.getElementById('welcomeScreen');
    screenBody.style.height = window.innerHeight.toString();
    screenBody.style.width = window.innerWidth.toString();
  }

}
