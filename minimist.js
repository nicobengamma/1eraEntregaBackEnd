const parseArgv = require("minimist");

const argv = parseArgv(process.argv.slice(2));
console.log(argv);
