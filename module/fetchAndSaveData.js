const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// module.exports = async function fetchAndSaveData(dataObj) {
//     try {
//         const response = await fetch(dataObj.url);
//         const data = await response.json();
//         if (!Array.isArray(data)) {
//             console.error(`Error: Response is not an array. Response: ${data}`);
//             return;
//         }

//         const dataPath = path.join(__dirname, "data");
//         const dataFile = path.join(dataPath, `${dataObj.name}.json`);

//         if (!fs.existsSync(dataPath)) {
//             fs.mkdirSync(dataPath);
//         }

//         fs.writeFileSync(dataFile, JSON.stringify(data));
//         console.log(`Data has been saved to ${dataFile}`);
//     } catch (err) {
//         console.error(`Error: ${err}`);
//     }
// }

module.exports = async function fetchAndSaveData(dataObj) {
    return new Promise((resolve, reject) => {
        try {
            fetch(dataObj.url)
                .then((response) => response.json())
                .then((data) => {
                    if (!Array.isArray(data)) {
                        reject(`Error: Response is not an array. Response: ${data}`);
                    }

                    const dataPath = path.join(__dirname, "data");
                    const dataFile = path.join(dataPath, `${dataObj.name}.json`);

                    if (!fs.existsSync(dataPath)) {
                        fs.mkdirSync(dataPath);
                    }

                    fs.writeFileSync(dataFile, JSON.stringify(data));
                    resolve(`Data has been saved to ${dataFile}`);
                })
                .catch((err) => {
                    reject(`Error: ${err}`);
                });
        } catch (err) {
            reject(`Error: ${err}`);
        }
    });
};
