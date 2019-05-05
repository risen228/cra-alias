# cra-alias

![npm](https://img.shields.io/npm/v/cra-alias.svg)
[![Build Status](https://travis-ci.org/risenforces/cra-alias.svg?branch=master)](https://travis-ci.org/risenforces/cra-alias)

You don't need to eject your App to add aliases!

## List of Contents

- [Main Advantages](#main-advantages)
- [Checklist](#checklist)
- [Installation](#installation)

### Main Advantages

- `cra-alias` uses standard `jsconfig.json` and `tsconfig.json` files, so you don't have to create any extra configuration files (like `config-overrides.js`)

- `cra-alias` automatically generates `moduleNameMapper` for Jest, according to your `js(ts)config.json`

### Checklist

- [x] Support `npm start`
- [x] Support `npm run build`
- [x] Support `npm test`
- [x] Support TypeScript CRA
- [ ] Support extra cli arguments
- [x] Add TypeScript example to README

### Installation

Install the package:

```sh
npm i -D cra-alias
```

The next steps depend on the language:

<details>
<summary><b>JavaScript</b></summary>
<br>
1. Go to project's root directory.

2. Create (or open if exists) `jsconfig.json`.

3. Edit it as follows:

   ```js
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

4. Go to `package.json`

5. Replace `react-scripts` with `cra-alias`, like that:

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
</details>

<details>
<summary><b>TypeScript</b></summary>
<br>
1. Go to project's root directory.

2. Create `tsconfig.paths.json`.

3. Edit it as follows:

   ```js
   {
     "compilerOptions": {
       "baseUrl": "src", // only 'src' or 'node_modules'
       "paths": {
         "@file-alias": ["./your/file.tsx"],
         "@folder-alias/*": ["./very/long/path/*", "./very/long/path/"]
       }
     }
   }
   ```

4. Go to `tsconfig.json`.

5. Add the following line to the beginning of the file:

   ```diff
   {
   + "extends": "./tsconfig.paths.json",
     "compilerOptions": {
       "target": "es5",
       ...
     },
     ...
   }
   ```

6. Go to `package.json`.

7. Replace `react-scripts` with `cra-alias`, like that:

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
</details>
