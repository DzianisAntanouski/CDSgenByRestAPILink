const npmInstall = require("./module/npmInstall");
const initializeCds = require("./module/initializeCds")
const addFetchNode = require("./module/addFetchNode")
const createCdsSchema = require("./createCdsSchema")

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
    data.forEach(async (element) => {
        await require("./module/fetchAndSaveData")(element);
        console.log("------------dir created");
    });
    createCdsSchema()

};


initialization(data);
