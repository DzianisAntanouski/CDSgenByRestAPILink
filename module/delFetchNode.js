const { exec } = require("child_process");

const delFetchNode = () => {
  return new Promise((resolve, reject) => {
    exec("npm uninstall node-fetch@2", (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};

module.exports = delFetchNode;
