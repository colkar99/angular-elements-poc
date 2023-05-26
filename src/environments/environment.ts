// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  prmOneUrl: 'https://localhost:44310',
  prmOneVersion: '1.0',
  baseUrl: 'http://localhost:61000',
  apiUsername: '200.18admin@Dealerschoice.com',
  apiPassword: 'password1',
  //   apiUsername: 'karthik@taramsys.com',
  // apiPassword: 'password',
  clientThemeName: 'Demo.cs',
  tac: {
    stamps: {
      never: { min: 0, max: 0, colorCode: '#d6dfe6' },
      visited: { min: 1, max: 4, colorCode: '#9ea5b1' },
      bronze: { min: 5, max: 14, colorCode: '#C77B30' },
      silver: { min: 15, max: 39, colorCode: '#4f5253' },
      gold: { min: 40, max: 119, colorCode: '#F7D101' },
      platinum: { min: 120, max: 9999999, colorCode: '#0C52C9' },
    },
    stampColors: '#F7D101',
    defaultLocationId: 14,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
