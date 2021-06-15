import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../../dashboard/components/dashboard/dashboard.component';
import { User } from '../../entity/user/user';
import { UserCreateDto } from '../../entity/user/user-create-dto';
import { LoaderService } from './loader.service';
import { LoginService } from './login.service';

describe('Login Service', () => {
  const resData: User = {
    email: 'janko.hrasko@gmail.com',
    firstName: 'Janko',
    lastName: 'Hrasko',
  };

  const reqData: UserCreateDto = {
    email: 'janko.hrasko@gmail.com',
    firstName: 'Janko',
    lastName: 'Hrasko',
    password: 'pass123',
  };

  const postUrl = 'https://demo-api.now.sh/users';

  let httpTestingController: HttpTestingController;
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
      ],
      providers: [LoginService, LoaderService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(LoginService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('signUp method should return expected data', (done) => {
    service.signUp(reqData).subscribe((data) => {
      expect(data).toEqual(resData);
      done();
    });

    const testRequest = httpTestingController.expectOne(postUrl);

    testRequest.flush(resData);
  });

  it('signUp method should use POST to retrieve data', () => {
    service.signUp(reqData).subscribe();

    const testRequest = httpTestingController.expectOne(postUrl);

    expect(testRequest.request.method).toEqual('POST');
  });
});
