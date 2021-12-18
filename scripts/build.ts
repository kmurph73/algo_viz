import util from "util";
import child_process from "child_process";
import fs from "fs";
import jsdom from "jsdom";

const JSDOM = jsdom.JSDOM;
const exec = util.promisify(child_process.exec);

const ts = Date.now();

const jsname = `main${ts}.js`;
const cssname = `main${ts}.css`;

let cmd = `./node_modules/.bin/esbuild ./dist/src/main.js --bundle --outfile=./build/${jsname}`;

let result = await exec(cmd);

cmd = `./node_modules/.bin/esbuild --bundle ./css/app.css --outfile=./build/${cssname}`;

result = await exec(cmd);

const html = fs.readFileSync("./index.html", "utf8");

const dom = new JSDOM(html);

const script = dom.window.document.querySelector(
  "script#main"
) as HTMLScriptElement;

script.src = jsname;

const css = dom.window.document.querySelector(
  "link[rel=stylesheet]"
) as HTMLLinkElement;

css.href = cssname;

await exec("touch ./build/favicon.ico");

fs.writeFileSync("./build/index.html", dom.serialize());
