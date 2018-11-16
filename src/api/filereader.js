import fs from "fs";
import { promisify } from "util";
const readFileP = promisify(fs.readFile);
const request = require("request");

export async function topWords(ctx, count) {
  let res = {};

  let top10 = [];
  let topSet = new Set();
  //promisified the read file
  let start = Date.now();
  const content = await readFileP("./big.txt", "utf8");
  //console.log(count, "getting to ");
  console.log("File Read time", Date.now() - start);
  start = Date.now();
  const topTenWords = await processFile(content, count); // Or put the next step in a function and invoke it
  //console.log("wordList", topTenWords);
  console.log("File processing and sorting time", Date.now() - start);
  start = Date.now();
  const topTenWordsWithMeaning = await getDictData(topTenWords);
  console.log("Dict API call time", Date.now() - start);
  //console.log("THE OP", topTenWordsWithMeaning);
  ctx.body = topTenWordsWithMeaning;
}

async function processFile(content, count) {
  // console.log("Ready to process");
  let data = content.split(" ");
  // data = data.filter(d => d.length > 4); // can be removed for faster iteration
  //console.log(data);
  let map = {}; //map of all words
  data.forEach(ele => {
    if (ele.length > 4) {
      if (map[ele] != undefined) {
        let x = map[ele];
        let counter = ++x;
        map[ele] = counter; //check len here
        // insertTop10(ele, counter);
      } else {
        map[ele] = 1;
      }
    }
  });
  // we have frequency map of all words- just need to pick top 10 now
  let frequencyMapArray = Object.entries(map);

  function compare([akey, aval], [bkey, bval]) {
    //console.log([akey, aval], [bkey, bval], "compare");
    if (aval > bval) return -1;
    if (aval < bval) return 1;
    return 0;
  }
  frequencyMapArray.sort(compare);
  //console.log("TOP 10", temp);
  frequencyMapArray = frequencyMapArray.slice(0, count);
  console.log(" final top  elements\n", frequencyMapArray);
  //call the meanings API
  //const finalRes= await getDictData(top10);
  //ctx.body=finalRes;
  return frequencyMapArray;
}

function transformResponse(data) {
  const res = [];
  //console.log(data, "ip tp transofrm");
  if (data.length > 0) {
    const transformeddata = data.map(d => {
      if (d.syn) {
        //somw rods don't hav syn
        d.syn.map(x => res.push(x));
      }
    });
  }
  //console.log(res, "transform res");
  return res;
}

export async function getDictData(top10) {
  let wordswithSynonyms = [];
  for (let i = 0; i < top10.length; i++) {
    //  console.log("getting data for", top10[i]);
    //call the api with x return it to meaning data
    const wordInput = top10[i][0];
    const data = await apiConnector(wordInput);
    const syn = await transformResponse(data);
    // console.log("PUSHING", { word: wordInput, synonym: syn });
    wordswithSynonyms.push({
      word: wordInput,
      synonym: syn,
      count: top10[i][1]
    });
  }
  //console.log(JSON.stringify(wordswithSynonyms), "retur");
  return wordswithSynonyms;
  //console.log(meaningData);
}

export async function apiConnector(word) {
  const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf&lang=en-en&text=${word}`;

  async function getData(url) {
    // Setting URL and headers for request
    const options = {
      url: url
    };
    // Return new promise
    let p = new Promise(function(resolve, reject) {
      // Do async job
      request.get(options, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
    return await p;
  }

  const res = JSON.parse(await getData(url));
  if (res.code) {
    // console.log("no data found");
    return [];
  } else {
    // console.log(res.def[0].tr, "inal");
    return res.def[0].tr;
  }
}
