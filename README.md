# cra-alias

![npm](https://img.shields.io/npm/v/cra-alias.svg)
[![Build Status](https://travis-ci.org/risenforces/cra-alias.svg?branch=master)](https://travis-ci.org/risenforces/cra-alias)

You don't need to eject your App to add aliases!

## Main advantage

`cra-alias` uses standard `jsconfig.json` and `tsconfig.json` files, so you don't have to create any extra configuration files (like `config-overrides.js`)

## Checklist

- [x] Support `npm start`
- [ ] Support `npm test`
- [x] Support `npm run build`
- [ ] Support `tsconfig.json`

## Installation

> ⚠️ **Note:**  
> `cra-alias test` and `tsconfig.json` is not supported at the moment.

1. Install this package:

   ```sh
   npm i -D cra-alias
   ```

2. Create (or open if it exists) one of the following files in app root directory:

   - `jsconfig.json` if you use JavaScript
   - `tsconfig.json` if you use TypeScript

3. Edit it as follows:

   ```json
   {
     "compilerOptions": {
       "baseUrl": "src", // only 'src' or 'node_modules'
       "paths": {
         "@file-alias": ["./your/file.js"],
         "@folder-alias/*": ["./very/long/path/*", "./very/long/path/"]
       }
     }
   }
   ```

4. Go to package.json

5. Replace 'react-scripts' with 'cra-alias', like that:

   ```diff
     "scripts": {
   -   "start": "react-scripts start",
   +   "start": "cra-alias start",
   -   "build": "react-scripts build",
   +   "build": "cra-alias build",
   -   "test": "react-scripts test",
   +   "test": "cra-alias test",
       "eject": "react-scripts eject"
     }
   ```

6. Done!
