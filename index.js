const npmInstall = require("./module/npmInstall");
const initializeCds = require("./module/initializeCds")
const addFetchNode = require("./module/addFetchNode")
const createCdsSchema = require("./createCdsSchema")
const createService = require("./module/createService")

const data = [
    {
        name: "users",
        url: "https://jsonplaceholder.typicode.com/users"
    },
    {
        name: "posts",
        url: "https://jsonplaceholder.typicode.com/posts"
    }
]

const initialization = async (data) => {
    await initializeCds();
    console.log("------------cds init completed");
    await addFetchNode();
    console.log("------------fetch installed");
    await npmInstall();
    console.log("------------npm i completed");
    const promises = data.map(async (element) => {
        return require("./module/fetchAndSaveData")(element);
    });
    await Promise.all(promises);
    console.log("------------dir created");
    await createCdsSchema();
    await createService();

};


initialization(data);
