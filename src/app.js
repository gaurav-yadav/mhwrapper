import dynamo from "./dynamo";
import * as reader from "./api/filereader";
const port = process.argv.length >= 3 ? process.argv[2] : 8087;
dynamo({ port });

console.log(` server is listening on localhost:${port}`);
