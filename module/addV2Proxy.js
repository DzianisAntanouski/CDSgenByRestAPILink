const { exec } = require("child_process");

module.exports = async function addV2Proxy() {
    return new Promise((resolve, reject) => {
        exec("npm i @sap/cds-odata-v2-adapter-proxy", (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}