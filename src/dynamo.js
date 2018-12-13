import koa from "koa";
import router from "koa-route";
import * as mh from "./api/mhere";
const app = new koa();
var bodyParser = require("koa-bodyparser");
//add loggin here
app.use(bodyParser());

//USE a mi

app.use(router.post("/login", mh.login));
app.use(router.get("/in", mh.markin));
app.use(router.get("/out", mh.markout));

export default function(options = {}) {
  const { port } = options;
  return port ? app.listen(port) : app.listen();
}
