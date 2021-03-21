import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userName = 'Login';
  constructor() { }

  getUsername() {
    return this.userName;
  }

  setUserName(username){
    this.userName = username;
  }

}
