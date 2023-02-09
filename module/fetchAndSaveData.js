const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

module.exports = async function fetchAndSaveData(url, sName) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error(`Error: Response is not an array. Response: ${data}`);
            return;
        }

        const dataPath = path.join(__dirname, "data");
        const dataFile = path.join(dataPath, `${sName}.json`);

        if (!fs.existsSync(dataPath)) {
            fs.mkdirSync(dataPath);
        }

        fs.writeFileSync(dataFile, JSON.stringify(data));
        console.log(`Data has been saved to ${dataFile}`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}