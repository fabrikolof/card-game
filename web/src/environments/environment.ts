// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    apiKey: "AIzaSyAMX6OdhUrj3j1dGr3iSLp3DjIYF8L10es",
    authDomain: "cardgame-17c24.firebaseapp.com",
    projectId: "cardgame-17c24",
    messagingSenderId: "828887685957",
    appId: "1:828887685957:web:b6440f90692cdc377cfc2c",
    measurementId: "G-LBXDNM5JFW"
  },
  production: false,
  apiBase: "http://localhost:8080",
  socketBase: "ws://localhost:8081/retrieve/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
