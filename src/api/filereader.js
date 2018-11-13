import fs from "fs";
import { promisify } from "util";
export async function topWords(ctx) {
  let res = {};

  let top10 = [];
  console.log("here", process.cwd());
  fs.readFile("./bigtest.txt", "utf8", function read(err, data) {
    if (err) {
      throw err;
    }
    const content = data;

    // Invoke the next step here however you like
    console.log(content); // Put all of the code here (not the best solution)
    processFile(content); // Or put the next step in a function and invoke it
  });
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
   // data = data.filter(d => d.length > 4);
    console.log(data);
    let map = new Map();
    data.forEach(ele => {
      if (map.get(ele) != undefined) {
        let x = map.get(ele);
        //console.log("x is ", x);
        map.delete(ele);
        let counter = ++x;
        map.set(ele, counter);//check len here 
        insertTop10(ele, counter);
      } else {
        map.set(ele, 1);
      }
    });

    console.log("TOP 10");
    console.log(top10);
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
