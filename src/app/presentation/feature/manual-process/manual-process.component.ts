import {Component, OnInit} from '@angular/core';
import {ImageProcessorService} from '../../../logic/image-processor.service';

@Component({
  selector: 'app-manual-process',
  templateUrl: './manual-process.component.html',
  styleUrls: ['./manual-process.component.css', '../../../app.component.css'],
  providers: [ImageProcessorService]
})
export class ManualProcessComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
