import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit{
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;
  
  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService){}
  
  ngOnInit(): void {
    this.getImages(); 
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }

  onFileUploadChange(event: Event): void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void{
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });
    }
  }
}

