# Ecma NPM Modules

An investigation into publishing native ECMA Modules via npm and consuming them in browser and node applications.

This project is a [lerna](https://lerna.js.org) monorepo which contains 2 libraries, and some apps. The apps consume one of the libraries, which has a dependency on the other library.

The libraries are written using ECMA Module semantics (`import`, `export` and full file paths including the extension) which should theoretically work with Node, modern browsers, and various bundling systems.

Ideally in the future we will have "Import Maps" in browsers, but until then (and without wanting to any build-time / runtime dependencies) I have forgone using those purely in favour of specifying full paths where necessary.

The point of this project is to understand whether it is practical to publish Ecma Modules to NPM, and whether there are any tangible costs or benefits to doing so.

# Packages in this project

- `lib-date`, a date formatting library which provides two date-formatting functions, both of which depend on `lib-string`
- `lib-string`, a string formatting library which can "pad" or "quote" strings
- `app-browser`, a vanilla JS browser application that requires no compilation, assuming the presence of `node_modules` and a suitable browser.
- `app-browser-angular`, an angular app (created with `npx -p @angular/cli ng new app-browser-angular`)
- `app-browser-cra`, a react app (created with `npx create-react-app app-browser-cra`)
- `app-node`, a node application
- `app-parcel`, a vanilla web application bundled using Parcel
- `app-rollup`, a vanilla js application bundled using Rollup
- `app-webpack`, a vanilla js application bundled using Webpack

# Scripts

You can run `npm run bootstrap` at the root to make sure that `lerna` has created all the symlinks for you.

Then run `npm run build` to build all of the projects that require it (all the `app-*` projects except `app-browser` and `app-node`). That will run the build scripts in each package and you can inspect the results (usually in either a `dist/` or `build/` folder).

# Results

| Project Name    | Path                  | Import Style | Tree Shaking |
| --------------- | --------------------- | ------------ | :----------: |
| Native Browser  | `app-browser`         | Full Path    |      ❌      |
| Angular         | `app-browser-angular` | Node         |      ❌      |
| React (CRA)     | `app-browser-cra`     | Node         |      ✅      |
| Node            | `app-node`            | Node         |      ❌      |
| Parcel          | `app-parcel`          | Node         |      ❌      |
| Rollup + Plugin | `app-rollup`          | Node         |      ✅      |
| Webpack         | `app-webpack`         | Node         |      ✅      |

# Project Notes

## Vanilla Browser App

See [./packages/app-browser/index.html](./packages/app-browser/index.html).

Works fine! Browsers (until `import-map` is supported) need the exact file loaded. Since the published libraries are written in a browser-supporting manner (i.e. they `import` full file paths including the extension) the user can either `import` the root module, or a specific file that they require. In either case, a full file path is required, and there can be no tree-shaking (if you import the root file of a module that itself imports 2 things, but you only use one, everything will be loaded by the browser).

## Angular

See [./packages/app-browser-angular/src/app/app.component.ts](./packages/app-browser-angular/src/app/app.component.ts).

Angular's default setup does not do any tree shaking, but everything works out of the box just by referencing the package name.

## Create React App

See [./packages/app-browser-cra/src/App.js](./packages/app-browser-cra/src/App.js).

`create-react-app`s webpack setup tree-shakes the loaded modules when building. Only the imported functions (from the direct dependency and the transitive one) are loaded. You can see this in the built output (the code will be in the `main.{HASH}.chunk.js` file).

## Node App

See [./packages/app-node/index.js](./packages/app-node/index.js).

This requires Node 13+, and you will still see a warning about "ESM Modules" being experimental, which is true. You _don't_ need to add the `--experimental-modules` flag as long as you include `"type": "module"` in the appropriate `package.json` files.

Since this is node, we can rely on `package.json` in the library to point us to the right actual file, and we don't need to include the full file path.

Note that when you have set type as "module", you can no longer use `require()`!

## Parcel App

See [./packages/app-parcel/index.js](./packages/app-parcel/index.js).

Doesn't tree shake by default, but does let you use Node style module resolution.

## Rollup App

See [./packages/app-rollup/index.js](./packages/app-rollup/index.js).

Does tree shake, and assuming use of `@rollup/plugin-node-resolve` we can just reference the package name.

## Webpack App

See [./packages/app-webpack/src/index.js](./packages/app-webpack/src/index.js).

Does tree shaking (no loaders or any other config except `mode: "production"` used in `webpack.config.js`) anfd lets us reference the package name.

# Relevant Links

- [ESM Modules in Node](https://nodejs.org/api/esm.html)
- [ESM Module loader warning in Node](https://github.com/nodejs/node/issues/30213), suggests that "you should not use it in production yet (or publish any node module that uses es6 modules that is meant to be used with node)".

# TODO

- Investigate `"exports": ...` in library package.json files, see Node ESM docs
- Collate metrics for all apps into a table
