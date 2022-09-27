const yargs = require("yargs");

const argv = yargs
  .default({
    name: "gonzalo",
    lastname: "itza",
  })
  .alias({
    n: "name",
    l: "lastName",
  })
  .boolean("admin").argv;

console.log(argv);
