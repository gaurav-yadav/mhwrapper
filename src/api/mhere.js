import { PythonShell } from "python-shell";
// const util = require("util");
// const exec = util.promisify(require("child_process").spawn);
//var spawn = require("child-process-promise").spawn;
const cp = require("child_process");
export async function login(ctx) {
  console.log("loggin in at", ctx.request.body.uname);
  let op;
  let python = cp.spawnSync("python", ["test.py", "in"], {
    input: "USER password"
  });

  ctx.body = python.stdout;
  // python.stdout.on("data", function(data) {
  //   console.log("op data", data.toString());
  //   op += data.toString();
  // });
  // await python.on("close", function(code) {
  //   //ctx.body = "logged in" + ctx.request.body + op;

  //   console.log("close -----", op);

  //   return op;
  // });
  // console.log("setting body");
  // ctx.body = op;
  // python.on("end", function(code) {
  //   console.log("steam ended");
  //   //  ctx.body = "logged in" + ctx.request.body + op;
  //   return op;
  // });
  // python.stdin.write("Gyadav@");
  // python.stdin.end();
  // await python.on("exit", function(code) {
  //   console.log("exit done");
  //   ctx.body = op;
  // }); // (B)
  //ctx.body = "donee";
}

export async function markin(ctx) {
  console.log("marking in");
  let python = cp.spawnSync("python", ["mhereq.py", "in"], {
    input: "USER password"
  });

  ctx.body = python.stdout;
}

export async function markout(ctx) {
  let python = cp.spawnSync("python", ["mhereq.py", "out"], {
    input: "USER password"
  });
  ctx.body = python.stdout;
}
