import Koa from "koa";
import koaWebpack from "koa-webpack";
import Router from "@koa/router";
import webpack from "webpack";
import config from "../webpack.config.dev";
import open from "open";

const run = async () => {
  const compiler = webpack(config);
  const middleware = await koaWebpack({ compiler });

  const port = 3000;

  const router = new Router();

  router.get("/users", ctx => {
    ctx.type = "application/json";
    ctx.body = JSON.stringify([
      { id: 1, firstName: "Bob", lastName: "Smith", email: "bob@gmail.com" },
      {
        id: 2,
        firstName: "Tammy",
        lastName: "Norton",
        email: "tnorton@yahoo.com"
      },
      {
        id: 3,
        firstName: "Tina",
        lastName: "Lee",
        email: "lee.tina@hotmail.com"
      }
    ]);
  });

  const app = new Koa();

  app.use(router.routes()).use(router.allowedMethods());
  app.use(middleware);

  app.listen(3000);

  open("http://localhost:" + port);
};

run();
