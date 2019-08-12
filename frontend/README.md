# Angular Frontend

Angular Frontend for [Academind's GraphQL, Node.JS, Express](https://youtu.be/JmFSGqbmzT4) App.

This frontend replaces the React Frontend.

## Steps
Following are documented steps to reproduce the Frontend:

### Video no. 11

1. `ng new frontend` in the root folder
2. Use `angular-routing`
3. add `<router-outlet>/</router-outlet>` in `app.component.html`
4. generate `auth`, `events`, `bookings` components using:

        ng g c --spec false auth
        ng g c --spec false events
        ng g c --spec false bookings

5. fill the `routes` in `app-routing.module.ts` accordingly
6. Import components into the routing module

### Video no. 12
Adding Navbar

1. generate new navbar component

        ng g c --spec false navigation

2. adapt the `navigation.component.html` accordingly
3. add the component to `app.component.html`
4. adapt the CSS Classes for navigation
5. add CSS Class for `main` content

### Video no. 13
Hitting the API

1. adapt the Authentication form in `auth.component.html` and `auth.component.css`
2. add `models/User.ts` into the `src/app/auth` to create a `User` Class
3. Utilize it to create a `model` when user enters credentials
4. Use [Angular Template-Driven Forms Documentation](https://angular.io/guide/forms) as reference to build the Authentication Form
5. Create `auth.service.ts` to send Authentication Data to backend
6. Add `HttpClientModule` to `app.module.ts`
7. create `addUser` service for User creation and try submitting a new user (should throw CORS error)
8. Adapt Backend code for CORS
9. use `logIn: boolean` for Default Mode: Login => `logIn = true`
10. toggle the value of `logIn` to change between Login Mode or Signup Mode
11. Based on `logIn` create a different `requestBody` for the GraphQL Endpoint
        if (logIn) { use `login(email: String!, password: String!` } else { use `createUser`}
12. Console log the returned values from the endpoint

