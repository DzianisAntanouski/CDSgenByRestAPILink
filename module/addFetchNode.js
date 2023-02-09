const { exec } = require("child_process");

module.exports = async function addFetchNode() {
    return new Promise((resolve, reject) => {
        exec("npm install node-fetch@2", (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}