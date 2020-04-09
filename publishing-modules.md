# Publishing Modules

- Assume [Import Maps](https://github.com/WICG/import-maps) that can resolve
  `node_modules` (which exists in `node` and is coming to browsers).
- Packages can then actually be published _un_-transpiled.
- Should probably still be subject to some kind of build / `.npmignore` pattern
  to avoid having loads of cruft.

## Javascript Source Layout

`package.json`

```json
{
  "main": "src/index.js",
  "module": "src/index.js",
  "dependencies": {
    "module-a": "1.0.0"
  },
  "scripts": {
    "build": "cp -R src/ dist/"
  }
}
```

`.npmignore`

```
/src
# etc
```

Note in the above that there is _**no compilation**_!

`src/index.js`

```js
import { a } from "module-a";
import { b } from "./b.js"; // including the file suffix
```

We can reasonably safely expect that `import` configuration will be available in
browsers fairly soon via "Import Maps", which means we can rely on resolving
things inside the `node_modules` directory.

Note also in the above that we assume the same structure inside `module-a` as we
have in this module - we need to directly import import the "main" file, by path
and including the extension.

`src/b.js`

```js
export const b = { foo: "bar" };
```

# In this project

- Note that _apps_ are written directly at the root of their package folder, but _libraries_ have a `./src` folder. This matters because, in a lot of app contexts, there's bundler-magic to resolve `node_modules/` to be at the same level as items inside `./src`, whereas we can't do that (yet).

# Relevant Links

- [ESM Module loader warning in Node](https://github.com/nodejs/node/issues/30213), suggests that "you should not use it in production yet (or publish any node module that uses es6 modules that is meant to be used with node)".
