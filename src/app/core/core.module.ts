import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [LoaderComponent],
  providers: [LoaderService, LoginService],
})
export class CoreModule {}
