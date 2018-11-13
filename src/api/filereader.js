import fs from "fs";
import { promisify } from "util";
export async function topWords(ctx) {
  let res = {};

  let top10 = [];
  let topSet = new Set();
  fs.readFile("./big.txt", "utf8", function read(err, data) {
    if (err) {
      throw err;
    }
    const content = data;

    // Invoke the next step here however you like
    //console.log(content); // Put all of the code here (not the best solution)
    processFile(content); // Or put the next step in a function and invoke it
  });

  //NOT USING THIS function anymore changed the array mapping logic below
  function insertTop10(ele, x) {
    //console.log(top10);
    //add  logic to check if element already there

    top10.push({ ele, x });
    function compare(a, b) {
      // console.log(a, b, "compare");
      if (a.x > b.x) return -1;
      if (a.x < b.x) return 1;
      return 0;
    }
    if (top10.length > 9) {
      top10.sort(compare);
      top10 = top10.slice(0, 9);
      console.log(top10);
    }
  }

  function processFile(content) {
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
    frequencyMapArray = frequencyMapArray.slice(0, 10);
    console.log(" final top 10 elements\n", frequencyMapArray);
    //call the meanings API
    //const finalRes= await getDictData(top10);
    //ctx.body=finalRes;
  }
}

function getDictData(top10) {
  let meaningData = top10.map(x => {
    //call the api with x return it to meaning data
  });

  return meaningData;
}
