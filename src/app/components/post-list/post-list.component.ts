import { Component, inject } from '@angular/core';
import { injectSelector } from '@reduxjs/angular-redux';
import { selectStories } from '../../store/slices/sotries-slice';
import { AsyncPipe, CommonModule } from '@angular/common';

import { StoreisService } from '../../services/storeis.service';
import { PostPreviewComponent } from '../post-preview/post-preview.component';

@Component({
  selector: 'post-list',
  imports: [CommonModule,PostPreviewComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  storeis = injectSelector(selectStories)
  storiesService = inject(StoreisService)
  ngOnInit(){
    console.log(this.storeis())
    this.storiesService.loadStories()

  }
 
}
