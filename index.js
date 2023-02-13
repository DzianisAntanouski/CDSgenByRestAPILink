const fs = require('fs');
const npmInstall = require("./module/npmInstall");
const initializeCds = require("./module/initializeCds")
const addFetchNode = require("./module/addFetchNode")
const addV2Proxy = require("./module/addV2Proxy")
const createCdsSchema = require("./module/createCdsSchema")
const createService = require("./module/createService")
const installCDS = require("./module/installCDS")
const createMySrvJsFile = require("./module/createMySrvJsFile")
const createServerJs = require("./module/createServerJs")


const data = JSON.parse(fs.readFileSync("data.json", 'utf-8'));
const initialization = async (data) => {
    await installCDS();
    await initializeCds();
    console.log("------------cds init completed");
    await addFetchNode();
    await addV2Proxy();
    console.log("------------fetch installed");
    
    const promises = data.map(async (element) => {
        return require("./module/fetchAndSaveData")(element);
    });
    await Promise.all(promises);
    console.log("------------data created");
    
    await createCdsSchema();
    await createService();
    await createMySrvJsFile();
    await createServerJs();
    await npmInstall();
    console.log(" run command------------npm install && cds watch");
};


initialization(data);
