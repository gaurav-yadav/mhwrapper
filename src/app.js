import dynamo from "./dynamo";
const port = process.argv.length >= 3 ? process.argv[2] : 3389;
dynamo({ port });

console.log(` server is listening on localhost:${port}`);
