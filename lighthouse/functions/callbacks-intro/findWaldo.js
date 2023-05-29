// The second argument/parameter is expected to be a (callback) function
const findWaldo = function(names, found) {
  for (let i = 0; i < names.length; i++) {
    let name = names[i];
    if (name === "Waldo") {
      found(i);   // execute callback
    }
  }
}

const actionWhenFound = function(i) {
  console.log("Found Waldo at index " + i + " !");
}

findWaldo(["Alice", "Bob", "Waldo", "Winston"], actionWhenFound);