# Ecma NPM Modules

An investigation into publishing native ECMA Modules via npm and consuming them in browser and node applications.

# In this project

- Note that _apps_ are written directly at the root of their package folder, but _libraries_ have a `./src` folder. This matters because, in a lot of app contexts, there's bundler-magic to resolve `node_modules/` to be at the same level as items inside `./src`, whereas we can't do that (yet).

# Relevant Links

- [ESM Module loader warning in Node](https://github.com/nodejs/node/issues/30213), suggests that "you should not use it in production yet (or publish any node module that uses es6 modules that is meant to be used with node)".
