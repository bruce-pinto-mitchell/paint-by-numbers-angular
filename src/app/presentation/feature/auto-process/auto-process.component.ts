import {Component, Input, OnInit} from '@angular/core';
import {ImageProcessorService} from '../../../logic/image-processor.service';

@Component({
  selector: 'app-auto-process',
  templateUrl: './auto-process.component.html',
  styleUrls: ['./auto-process.component.css', '../../../app.component.css']
})
export class AutoProcessComponent implements OnInit {

  @Input() public imageSrc: string;

  constructor(private _imageProcessorService: ImageProcessorService) {
  }

  ngOnInit() {
    this._imageProcessorService.init(this.imageSrc);
  }

  public onProcessImageClicked(): void {
    this._imageProcessorService.onProcessImageClicked();
  }

  public onResetClicked(): void {
    this._imageProcessorService.reset();
    this._imageProcessorService.init(this.imageSrc);
  }

  get imageProcessorService(): ImageProcessorService {
    return this._imageProcessorService;
  }
}
