import {Injectable} from '@angular/core';

@Injectable()
export class ImageProcessorService {

  private _imageToProcess;
  private _canvasContext;
  private _canvas;
  private _tileData: Array<any> = [];
  private _replacementImages: Array<any> = [];
  private _imageToTileMapping: Array<any> = [];
  private _finishedLoading: boolean = false;

  constructor() {

  }

  public init(imageSrc: string = 'assets/images/1.jpg') {
    this._imageToProcess = this.getImageToProcess(imageSrc);
    this._imageToProcess.onload = () => {
      this.drawImageToScreen()
        .then(this.createImageTiles.bind(this))
        .then(this._loadReplacementImages.bind(this))
        .then(this._diffTilesToReplacementImagesRGB.bind(this));
    };
  }

  onProcessImageClicked(): void {
    if (!this._finishedLoading) {
      console.warn('Still loading image assets, please wait');
      return;
    }
    const tileHeight = this._canvasContext.canvas.height / 20,
      tileWidth = this._canvasContext.canvas.width / 20;

    this._tileData.forEach((tile, index) => {
      const replacementImage = this._replacementImages[this._imageToTileMapping[index]];
      replacementImage.image.height = tileHeight;
      replacementImage.image.width = tileWidth;
      this._canvasContext.putImageData(replacementImage.imageData.rawData, tile.x * tileWidth, tile.y * tileHeight);
    });
  }

  getImageToProcess(imageSrc: string): any {
    const image = new Image();
    image.src = imageSrc;
    return image;
  }

  drawImageToScreen(): Promise<{}> {
    return new Promise((resolve) => {
      this._canvas = document.getElementById('imageToProcess');
      this._canvasContext = this._canvas.getContext('2d');
      this._canvasContext.drawImage(this._imageToProcess, 0, 0);
      resolve();
    });
  }

  createImageTiles() {
    return new Promise((resolve) => {
      let tileIndex = 0;
      const tileHeight = this._canvasContext.canvas.height / 20,
        tileWidth = this._canvasContext.canvas.width / 20;

      for (let tileYIndex = 0; tileYIndex < 20; tileYIndex++) {
        for (let tileXIndex = 0; tileXIndex < 20; tileXIndex++) {
          this._tileData[tileIndex] = this._getImageData(this._canvasContext, tileXIndex, tileYIndex, tileWidth, tileHeight);
          tileIndex++;
          if (tileYIndex === 19 && tileXIndex === 19) resolve();
        }
      }
    });
  }

  private _getImageData(context, xIndex, yIndex, width, height): any {
    const tileData = context.getImageData(xIndex * width, yIndex * height, width, height),
      tileDataRGBAverages = this.getRGBAverage(tileData.data);
    return {rawData: tileData, ...tileDataRGBAverages, x: xIndex, y: yIndex};
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

  private _loadReplacementImages(): Promise<{}> {
    return new Promise((resolve) => {
      const tileHeight = this._canvasContext.canvas.height / 20,
        tileWidth = this._canvasContext.canvas.width / 20;
      for (let imageIndex = 1; imageIndex < 391; imageIndex++) {
        const image = new Image();
        image.src = `assets/images/${imageIndex}.jpg`;
        image.height = tileHeight;
        image.width = tileWidth;

        image.onload = () => {
          const canvas: any = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

          ctx.drawImage(image, 0, 0);
          this._replacementImages.push({
            imageData: this._getImageData(ctx, 0, 0, canvas.width, canvas.height),
            image: image
          });
          if (imageIndex === 390) {
            console.log('All images have successfully loaded');
            this._finishedLoading = !this._finishedLoading;
            resolve();
          }
        };
      }
    });
  }

  private _diffTilesToReplacementImagesRGB(): void {
    this._tileData.forEach((tile, tileIndex) => {
      let lowestImageDiff = -1;
      this._replacementImages.forEach((image, imageIndex) => {
        const colourDiff = this._getImageComparison(tile, image.imageData);
        if (lowestImageDiff === -1) {
          lowestImageDiff = colourDiff;
          this._imageToTileMapping[tileIndex] = imageIndex;
        } else if (lowestImageDiff > colourDiff) {
          lowestImageDiff = colourDiff;
          this._imageToTileMapping[tileIndex] = imageIndex;
        }
      });
    });
  }

  private _getImageComparison(image, image1): number {
    const differences = this._distance(image.red, image1.red) + this._distance(image.green, image1.green) + this._distance(image.blue, image1.blue);
    return Math.sqrt(differences);
  }

  private _distance(color, color1): number {
    return (color - color1) * (color - color1);
  }

}
