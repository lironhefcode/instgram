import { Component, inject } from '@angular/core';
import { UserProfileImageComponent } from '../../components/user-profile-image/user-profile-image.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/userInterface';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [UserProfileImageComponent,NgIf,AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private route = inject(ActivatedRoute)
  user$ : Observable<User> = this.route.data.pipe( map(data => data['user']))
 
  
}
