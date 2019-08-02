const Koa = require("koa");
const serve = require("koa-static");
const path = require("path");
const open = require("open");

const port = 3000;

const app = new Koa();

app.use(serve("src/"));

app.listen(3000);

open("http://localhost:" + port);
