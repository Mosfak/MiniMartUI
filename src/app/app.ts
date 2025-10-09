import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MiniMartUI');
}
