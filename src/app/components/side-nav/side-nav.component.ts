import { Component, inject, Input, WritableSignal } from '@angular/core';
import { UserProfileImageComponent } from '../user-profile-image/user-profile-image.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/userInterface';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'side-nav',
  imports: [UserProfileImageComponent,AsyncPipe,NgIf],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  @Input({required:true}) showCreateModel!:WritableSignal<boolean>
  authService = inject(AuthService)
  router = inject(Router)
  user$: Observable<User | null>  = this.authService.currentUser$
  onCreate(){
    this.showCreateModel.set(true)
  } 
  onNav(username: string){
    this.router.navigate([`/feed/${username}`])
  }
  onHome(){
    this.router.navigate([`/feed`])
  }
}
