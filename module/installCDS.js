const { exec } = require("child_process");

module.exports = function installCDS() {
    new Promise((resolve, reject) => {
        exec("npm i -g @sap/cds", (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
};
