console.log("directorio actual:", process.cwd);
console.log("ID del proceso:", process.pid);
console.log(process.version);
console.log(process.title);
console.log(process.platform);
console.log(process.memoryUsage());

process.on("beforeExit", (code) => {
  console.log("process beforeExist event with code:", code);
});

// process.exit();

console.log("este es mi tag");
