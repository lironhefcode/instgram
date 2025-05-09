import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core'
import { Story } from '../../models/stroyInterface'
import { UserProfileImageComponent } from '../user-profile-image/user-profile-image.component'
import { UserService } from '../../services/user.service'
import { AuthService } from '../../services/auth.service'
import { AsyncPipe, NgIf } from '@angular/common'
import { IslikedPipe } from '../../pipes/isliked.pipe'
import { Observable } from 'rxjs'
import { User } from '../../models/userInterface'
import { ByUserIntreface } from '../../models/byUserInterface'
import { IsfollowingPipe } from '../../pipes/isfollowing.pipe'
import { Router } from '@angular/router'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { StoreisService } from '../../services/storeis.service'
import { CommentsListComponent } from '../comments-list/comments-list.component'

@Component({
  selector: 'post-preview',
  imports: [
    UserProfileImageComponent,
    AsyncPipe,
    IslikedPipe,
    NgIf,
    IsfollowingPipe,
    ReactiveFormsModule,
    CommentsListComponent
  ],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss',
})
export class PostPreviewComponent {
  txt = new FormControl('')
  router = inject(Router)
  @Input({ required: true }) story!: Story
  userService = inject(UserService)
  authService = inject(AuthService)
  storyService = inject(StoreisService)
  curUser$ = this.authService.currentUser$ as Observable<User>
  @ViewChild('like') likeBtn!: ElementRef
  showComments = false
  onLike() {
    let sub
    if (this.likeBtn.nativeElement.classList.contains('red')) {
      sub = this.authService
        .getMiniUser()
        .subscribe(
          (miniUser) =>
            (this.story = {
              ...this.story,
              likedBy: this.story.likedBy.filter(
                (user) => user._id !== miniUser._id
              ),
            })
        )
    } else {
      sub = this.authService
        .getMiniUser()
        .subscribe(
          (miniUser) =>
            (this.story = {
              ...this.story,
              likedBy: [...this.story.likedBy, miniUser],
            })
        )
    }
    sub.unsubscribe()
    this.userService.like(this.story._id)
  }

  onFollow() {
    this.userService.handleFollow(this.story.by.username)
  }
  toProfile(username:string){
    this.router.navigate([`/feed/${username}`])
  }
  comment(){
    if(this.txt.value){
      this.storyService.addComment(this.txt.value,this.story._id ).subscribe(() => this.txt.setValue('')) 
    }
  }
  onShowComments() {
    this.showComments = !this.showComments
  }
}
