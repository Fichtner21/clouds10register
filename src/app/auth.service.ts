import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from './model/auth-user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly URL = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  public registerUser(user: AuthUser): Promise<unknown> {
    return this.httpClient.post(AuthService.URL + '/register', user).toPromise();
  }
}
