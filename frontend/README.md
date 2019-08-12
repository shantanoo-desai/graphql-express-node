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

