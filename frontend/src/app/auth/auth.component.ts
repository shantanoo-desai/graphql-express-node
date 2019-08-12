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
  logIn = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    let  requestBody = {};
    if (this.logIn) {
      requestBody = {
        query: `
          query {
            login(email: "${this.model.email}", password: "${this.model.password}") {
                userId
                token
                tokenExpiration
              }
            }
        `
      };
    } else {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${this.model.email}", password: "${this.model.password}"}) {
              _id
              email
            }
          }
        `
      };
    }
    this.authService.addUser(requestBody)
      .subscribe(result => {
        console.log(result);
      });
  }

}
