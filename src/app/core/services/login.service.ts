import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../entity/user/user';
import { UserAdapter } from '../../entity/user/user-adapter';
import { UserCreateDto } from '../../entity/user/user-create-dto';
import { UserDto } from '../../entity/user/user-dto';
import { LoaderService } from './loader.service';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  signUp(userCreateDto: UserCreateDto): Observable<User> {
    return of(this.loaderService.addLoadingEvent()).pipe(
      mergeMap(() =>
        this.http
          .post<UserDto>(environment.apiUrl + '/users', userCreateDto)
          .pipe(
            map((userDto: UserDto) => {
              const user = UserAdapter.userDtoToUser(userDto);

              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/dashboard']);
              this.loaderService.removeLoadingEvent();
              return user;
            })
          )
      ),
      catchError((error) => {
        this.router.navigate(['/login']);
        this.loaderService.removeLoadingEvent();
        return of(error);
      })
    );
  }

  isUserLoggedIn = () => of(localStorage.getItem('user') ? true : false);
}
