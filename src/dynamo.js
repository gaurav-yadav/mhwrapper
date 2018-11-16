import koa from "koa";
import router from "koa-route";
import * as users from "./api/users";
import * as cal from "./api/calendar";
import * as reader from "./api/filereader";
const app = new koa();
var bodyParser = require("koa-bodyparser");
//add loggin here
app.use(bodyParser());

//USE a mi

app.use(router.get("/top/:count", reader.topWords));
// app.use(router.get("/users", users.userData));
// app.use(router.post("/calender/save/:userId", cal.createEvent));
// app.use(router.post("/calender/accept/:userId", cal.acceptEvent));
// app.use(router.post("/calender/delete/:userId", cal.deleteEvent)); //todo - can delete multiple events
//get events created by a user
//get events a user is invited for

export default function(options = {}) {
  const { port } = options;
  return port ? app.listen(port) : app.listen();
}
