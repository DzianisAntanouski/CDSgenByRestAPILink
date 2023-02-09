const npmInstall = require("./module/npmInstall");
const initializeCds = require("./module/initializeCds")
const addFetchNode = require("./module/addFetchNode")

const initialization = async (url, sName) => {
    await initializeCds();
    console.log("------------cds init completed");
    await addFetchNode();
    console.log("------------fetch installed");
    await npmInstall();
    console.log("------------npm i completed");
    await require("./module/fetchAndSaveData")(url, sName);
    console.log("------------dir created");
};

initialization("https://jsonplaceholder.typicode.com/users", "users");
