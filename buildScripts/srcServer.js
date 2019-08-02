import Koa from "koa";
import koaWebpack from "koa-webpack";
import webpack from "webpack";
import config from "../webpack.config.dev";
import open from "open";

const run = async () => {
  const compiler = webpack(config);
  const middleware = await koaWebpack({ compiler });

  const port = 3000;

  const app = new Koa();

  app.use(middleware);

  app.listen(3000);

  open("http://localhost:" + port);
};

run();
