# SVG2Sprite

This library collects .svg icons from the folder you specify into a single sprite.svg file, so you can use your .svg icons in the project without loading time.

## Installation

```sh
npm install @yartasdev/svg2sprite
```

## Usage

If you want to separate .svg icons by creating more than one .ts file, you can make more than one definition in the svg2sprite.config.js file.

```json
"scripts": {
  "svg2sprite": "svg2sprite",
  "prestart": "npm run svg2sprite"
},
```

> Note: This library creates sprite.svg file from the .svg files by using the SVGO library.

### Folder Structure

```
📦 src
├─ assets
│  └─ svg
│     ├─ logo
│     │  ├─ logo.svg
│     │  ├─ youtube.svg
│     │  └─ wikipedia.svg
│     └─ icons
│        ├─ user.svg
│        └─ calendar.svg
└─ app
   ├─ app.ts
   └─ svg
      ├─ logo
      │  └─ index.ts
      └─ icons
         └─ index.ts
```

### Config File 
`svg2sprite.config.js` You can review the [cosmiconfig](https://github.com/cosmiconfig/cosmiconfig#readme) documentation for more information about the config file.

You can use [SVGO](https://github.com/svg/svgo) configs in your config file. 

```javascript
module.exports = [
  {
    target: "src/assets/svg/logo",
    output: "src/app/svg/logo",
    svgo: {
      plugins: ["removeDimensions"],
    },
  },
  {
    target: "src/assets/svg/icons",
    output: "src/app/svg/icons",
    svgo: {
      plugins: ["cleanupAttrs"],
    },
  },
];
```
### Output

`./app/svg/logo/sprite.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
  <symbol id="logo" viewBox="0 0 24 24">
    ...
  </symbol>
</svg>
```

`./app/svg/icons/sprite.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
  <symbol id="user" viewBox="0 0 24 24">
    ...
  </symbol>
</svg>
```

### Usage

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><use href="/app/svg/logo/sprite.svg#logo" /></svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><use href="/app/svg/icons/sprite.svg#user" /></svg>
```