import dynamo from "./dynamo";
import * as reader from "./api/filereader";
const port = process.argv.length >= 3 ? process.argv[2] : 8087;
dynamo({ port });
const dict = [["begin", 5], ["account", 3], ["China.", 2]];
//reader.topWords();
//reader.getDictData(dict);
console.log(` server is listening on localhost:${port}`);
