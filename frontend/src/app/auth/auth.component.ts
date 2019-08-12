import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {

  model = new User('', '');

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.model);
  }

}
