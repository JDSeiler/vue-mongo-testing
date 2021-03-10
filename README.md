# vue-mongo-testing
This project was bootstrapped with [Vue CLI](https://cli.vuejs.org).

See the [Configuration Reference](https://cli.vuejs.org/config/) for more details about how to use the Vue CLI.

## Project setup
To install dependencies run:
```
npm install
```
MongoDB must be installed on your machine if you intend to host the Mongo instance locally.

To run the application, ensure MongoDB is running and accesible at the URI configured in `server/app-config.js`.
By default this is `localhost:27017`.

Then, navigate into the `server` directory and run `node index.js` to start the backend Express server.
Finally, to use the 'app': 
From the main project directory, run `npm run serve`, or compile and use the distribution version with `npm run build`.

## Baked in Vue CLI commands
```
# Starts a hot-reload capable dev server
npm run serve

# Compile for production
npm run build

# Lints all files and attempts to autofix
npm run lint
```
