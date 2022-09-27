const { exec } = require("child_process");

exec("ls -lh", (error, stdout, stderr) => {
  if (error) {
    console.log(error);
  }
  if (stderr) {
    console.log(stderr);
  }

  console.log(stdout);
});
