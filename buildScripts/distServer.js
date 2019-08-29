import Koa from "koa";
import serve from "koa-static";
import compress from "koa-compress";
import Router from "@koa/router";
import open from "open";

const run = async () => {
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

  app.use(compress());

  app.use(router.routes()).use(router.allowedMethods());
  app.use(serve("dist"));

  app.listen(3000);

  open("http://localhost:" + port);
};

run();
