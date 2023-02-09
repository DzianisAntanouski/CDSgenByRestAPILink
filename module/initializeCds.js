const { exec } = require("child_process");

module.exports = async function initializeCds() {
    return new Promise((resolve, reject) => {
        exec("cds init", (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}