# EVENTS-LIST-CLIENT

### Live : https://react-events-list.herokuapp.com/

### Server repo: https://github.com/ArkadiuszSa/react-form-server

### Description

My first react SPA application. To create app I used this boilplate: https://github.com/vikpe/react-webpack-typescript-starter
Dist folder is also in repo, beacasue webpack need more RAM then heroku limit for free acount.
If you want to check admin-panel, the login is admin@admin.com with password admin.
Generaly admin is adding event and user can sign up for this event.
Main techs:

- React, react-redux, react-router, axios
- Material UI, scss
- Webpack, babel
- Typescript, awesome-typescript-loader
- Jest, enzyme, redux-mock-store
- Express
- Linter for typescript and scss

### Installation and scripts

To install and start application localy use: `yarn install` and `yarn start-dev. Before that you should firstly run server app.

`yarn run start-dev` | Build app continuously (HMR enabled)
`yarn run start-prod` | Build app once (HMR disabled)
`yarn run start` | Run app by nodemon from /dist
`yarn run build` | Build app to `/dist/`
`yarn run test` | Run tests
`yarn run lint` | Run Typescript and SASS linter
`yarn run lint:ts` | Run Typescript linter
`yarn run lint:sass` | Run SASS linter

### File structure

At this moment only application-form in User module is finished. The rest of app has different structures. Generally I think a good option is to make file structure and naming like Angular style guide. Modules are a part of app designed for special purpose. After that we can make theam lazy loaded. Modules can contain pages and helpers folder. Page folder will store e.g for application-form:

- application-form.container.tsx | react-redux container that will connect props to dummy component and use services and actions
- application-form.component.tsx | dummy presentation component without state
- application-form.services.tsx | any logic functions like validators or http requests
- application-form.actions.tsx | list of actions with types and optional payload
- application-form.reducers.tsx | reducers that will perform state changes
- application-form.scss
- components | folder for another components used in page

I'm not sure that this file structure with resposibles are the best but it works fine.

### Pages

User:

- / -list of events, every event tab have link to sign up form
- /form -here user can sign on event

Admin:

- /admin/happenings -list of happenings with add new happening button
- /admin/happening/:id - happening data with update options
- /admin/applications - list of users applications

Common:

- /login - login form for admin panel
- /logout - displayed after admin log out, redirect to home /
- /no-acces - displayed if user with invalid token want to visit admin-panel
- /not-found - displayed when router can't find path

### Tests

At this time only application-form is tested. Most of the test are unit tests. Almost any expection have snapshot(great thing).

- Component- checked how diffrent props have imact on component rendering
- Container- Run diffrent functions connected by props, checking action types and payload
- Actions- just checking action type and payload
- Service- Mocking http request with axios-mock-adapter, checkig normal functions like validation
- Reducers- run actions and check state
