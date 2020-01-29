import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  get isLoggedIn(): boolean {
    return (this.auth.currentUser && this.auth.getToken()) ? true : false;
  }

  logOut() {
    this.auth.logOut();
  }
}
