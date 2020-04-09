const fs = require("fs");
const path = require("path");
const process = require("process");

const DIR_CUR = __dirname;
const DIR_ROOT = path.resolve(DIR_CUR, "..", "packages");

const DIR_APP_BROWSER = path.resolve(DIR_ROOT, "mg-app-browser");
const DIR_APP_BROWSER_MODULES = path.resolve(DIR_APP_BROWSER, "node_modules");
const DIR_APP_NODE = path.resolve(DIR_ROOT, "mg-app-node");
const DIR_APP_NODE_MODULES = path.resolve(DIR_APP_NODE, "node_modules");
const DIR_LIB_DATE = path.resolve(DIR_ROOT, "mg-lib-date");
const DIR_LIB_DATE_MODULES = path.resolve(DIR_LIB_DATE, "node_modules");
const DIR_LIB_STRING = path.resolve(DIR_ROOT, "mg-lib-string");
// const DIR_LIB_STRING_MODULES = path.resolve(DIR_LIB_STRING, "node_modules");

function link(modulesDir, targetPath, targetName) {
  try {
    fs.mkdirSync(modulesDir);
  } catch {}
  try {
    process.chdir(modulesDir);
    fs.symlinkSync(targetPath, targetName);
  } catch {}
}

link(DIR_APP_BROWSER_MODULES, DIR_LIB_DATE, "mg-lib-date");
link(DIR_APP_NODE_MODULES, DIR_LIB_DATE, "mg-lib-date");
link(DIR_LIB_DATE_MODULES, DIR_LIB_STRING, "mg-lib-string");
