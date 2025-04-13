import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';
import { User } from '../models/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authService = inject(AuthService)
  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/api/user/'
  like(postId : string){
    this.http.post(this.url + 'like',{postId},{ withCredentials: true}).pipe(tap(user => this.authService.updateUser(user as User))).subscribe()
  }
  follow(username:string ){
    this.http.post(this.url + 'follow',{username},{ withCredentials: true}).pipe(tap(user => this.authService.updateUser(user as User))).subscribe()
  }
  getByUsername(username:string) : Observable<User>{
   return this.http.get(`${this.url}${username}`,{ withCredentials: true}) as Observable<User>
  }
}
