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
  logInMode = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    let  requestBody = {};
    if (this.logInMode) {
      // Get Authentication Token if User Exists
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
      // Sign-In User
      this.authService.logInUser(requestBody);
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

      this.authService.signUpUser(requestBody)
      .subscribe((result: any) => {
        console.log('New User Created: ' +  result.data.createUser.email);
        console.log('New User ID: ' + result.data.createUser._id);
      });
    }
  }

}
