import { Component } from '@angular/core';
import {AuthService} from './core/serivce/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sm-ngrx';
  isCollapsed = false;

  constructor(private authService: AuthService) {
  }

  logout(): void {
    this.authService.signOut();
  }
}
