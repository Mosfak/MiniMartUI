import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styles: ``
})
export class Home {
  constructor() {
    localStorage.setItem('userRole', 'customer');
  }
}
