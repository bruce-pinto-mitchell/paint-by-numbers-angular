import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageProcessorService} from '../../../logic/image-processor.service';
import {NguCarousel} from '@ngu/carousel';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-manual-process',
  templateUrl: './manual-process.component.html',
  styleUrls: ['./manual-process.component.css', '../../../app.component.css']
})
export class ManualProcessComponent implements OnInit, OnDestroy {

  public carouselTileItems: Array<any> = [];
  public carouselTile: NguCarousel;
  public selectedImage: any;
  public imageSelected: Boolean = false;

  private _onImagesLoadedSubscription: Subscription;

  constructor(private _imageProcessorService: ImageProcessorService) {
  }

  ngOnInit() {
    this.selectedImage = 1;
    for (let imageIndex = 1; imageIndex < 391; imageIndex++) {
      const imagePath = `assets/images/${imageIndex}.jpg`;
      this.carouselTileItems.push({src: imagePath});
    }

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 1,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            border: 2px solid rgba(0, 0, 0, 0.55);
            padding: 4px;
            margin: 0 3px;
            transition-timing-function: cubic-bezier(.17, .67, .83, .67);
            transition: .4s;
          }
          .ngucarouselPoint li.active {
              background: #6b6b6b;
              transform: scale(1.2);
          }
        `
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }

  public ngOnDestroy(): void {
    if (this._onImagesLoadedSubscription) this._onImagesLoadedSubscription.unsubscribe();
  }

  public carouselTileLoad(evt: any) {

    const len = this.carouselTileItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }

  }

  public onmoveFn(event) {
    this.selectedImage = event.currentSlide;
  }

  public onProcessImageClicked() {
    this.imageSelected = !this.imageSelected;
    this._imageProcessorService.init(this.carouselTileItems[this.selectedImage].src);
    this._onImagesLoadedSubscription = this._imageProcessorService.subscribeToImagesLoaded(this._onImagesLoaded.bind(this));
  }

  public onResetClicked(): void {
    this._imageProcessorService.reset();
    this.imageSelected = !this.imageSelected;
  }

  private _onImagesLoaded(): void {
    this._imageProcessorService.onProcessImageClicked();
    const processingImageText = document.getElementById('processingImageText');
    if (processingImageText) processingImageText.innerText = 'Output Image';
  }

  get imageProcessorService(): ImageProcessorService {
    return this._imageProcessorService;
  }

}
