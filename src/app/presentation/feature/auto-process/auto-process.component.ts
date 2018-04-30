import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auto-process',
  templateUrl: './auto-process.component.html',
  styleUrls: ['./auto-process.component.css']
})
export class AutoProcessComponent implements OnInit {

  private _imageToProcess: HTMLImageElement;
  private _canvasContext;
  private _canvas;
  private _tileData: Array<any> = [];
  private _replacementImages: Array<any> = [];

  constructor() {

  }

  ngOnInit() {
    this._imageToProcess = this.getImageToProcess();
    this._imageToProcess.onload = this.drawImageToScreen.bind(this);
    this.createImageTiles();
    this._loadReplacementImages();
  }

  getImageToProcess(): HTMLImageElement {
    const image = new Image();
    image.src = 'assets/images/1.jpg';
    return image;
  }

  drawImageToScreen(): void {
    this._canvas = document.getElementById('imageToProcess');
    this._canvasContext = this._canvas.getContext('2d');
    this._canvasContext.drawImage(this._imageToProcess, 0, 0);
  }

  async createImageTiles() {
    let tileIndex = 0;
    const tileHeight = this._canvasContext.height / 20,
      tileWidth = this._canvasContext.width / 20;

    for (let tileYIndex = 0; tileYIndex < 20; tileYIndex++) {
      for (let tileXIndex = 0; tileXIndex < 20; tileXIndex++) {
        this._tileData[tileIndex] = await this._getImageData(this._canvasContext, tileXIndex, tileYIndex, tileWidth, tileHeight);
        tileIndex++;
      }
    }
  }

  private _getImageData(context, xIndex, yIndex, width, height): any {
    const tileData = context.getImageData(xIndex * width, yIndex * height, width, height),
      tileDataRGBAverages = this.getRGBAverage(tileData.data);
    return {tileData: tileData.data, ...tileDataRGBAverages};
  }

  getRGBAverage(data): any {
    let red = 0,
      green = 0,
      blue = 0;

    for (let i = 0; i < data.length; i += 4) {
      red += data[i];
      green += data[i + 1];
      blue += data[i + 2];
    }

    return {red: red / data.length, green: red / data.length, blue: red / data.length};
  }

  private _loadReplacementImages(): void {
    for (let imageIndex = 1; imageIndex < 391; imageIndex++) {
      const image = new Image(),
        canvas = document.createElement(`image-${imageIndex}`),
        ctx = canvas.getContext('2d');

      image.src = `assets/images/${imageIndex}.jpg`;
      ctx.drawImage(image, 0, 0);
      this._replacementImages.push(this._getImageData(ctx, 0, 0, canvas.width, canvas.height));
    }
  }

}
