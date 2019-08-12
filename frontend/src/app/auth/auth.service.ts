import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
    private graphQLEndpoint = 'http://localhost:3000/graphql';

    constructor(private http: HttpClient) {}
}
