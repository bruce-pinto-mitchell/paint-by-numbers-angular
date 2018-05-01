import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ImageProcessorService} from "../../../logic/image-processor.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css', '../../../app.component.css']
})
export class WelcomeComponent implements OnInit {
  public name: string = 'Paint By Numbers';
  public tileDivision: number = 20;

  constructor(private _imageProcessorService: ImageProcessorService) {

  }

  ngOnInit() {
    const screenBody = document.getElementById('welcomeScreen');
    screenBody.style.height = window.innerHeight.toString();
    screenBody.style.width = window.innerWidth.toString();
  }

  public onTileDivisionChanged(): void {
    this._imageProcessorService.setDivisions(this.tileDivision);
  }

}
