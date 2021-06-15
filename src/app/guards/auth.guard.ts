import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../core/services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): Observable<boolean> {
    return this.loginService.isUserLoggedIn().pipe(
      map((loggedIn: boolean) => {
        if (loggedIn) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
