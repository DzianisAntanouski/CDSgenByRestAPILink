const { exec } = require("child_process");

module.exports = async function npmInstall() {
  return new Promise((resolve, reject) => {
    exec("npm install", (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
};