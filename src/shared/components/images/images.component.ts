import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/services/upload.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  @Input() images: any[] = [];
  @Input() otherId: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onUploadFinished: EventEmitter<string> = new EventEmitter();

  progress: number;
  message: string;
  uplaodedImages: any[] = [];

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit() {
  }

  public uploadFile = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `otc.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.uploadService.uploadFile(formData).subscribe(url => {
        const uploadedImage = `${environment.API_URL}/api/upload/${url}`;
        this.onUploadFinished.emit(uploadedImage);
      });

    });
  }

}
