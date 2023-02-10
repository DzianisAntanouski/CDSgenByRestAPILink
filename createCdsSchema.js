const fs = require("fs");
const path = require("path");

const dataFolder = "module/data";
const dbFolder = "db";

const oDataTypes = {
    string: "String",
    number: "Decimal",
    boolean: "Boolean",
    object: "Association to",
};

const createCdsFiles = (filename, data) => {
    let schema = `entity ${filename} {
`;

    Object.keys(data).forEach((key) => {
        const value = data[key];
        const type = typeof value;
        const cdsType = oDataTypes[type];

        if (cdsType === "Association to") {
            const setName = `${filename}_${key}`;
            schema += `  ${key}: Association to ${setName};
`;
            createCdsFiles(setName, value);
        } else {
            schema += `  ${key}: ${cdsType}${type === "string" ? `(${value.length + 40})` : ""};
`;
        }
    });

    schema += "}";

    fs.writeFileSync(path.join(dbFolder, `${filename}.cds`), schema);
};

async function readCdsFiles() {
    try {
        const folderPath = path.join(__dirname, "db");
        const files = await fs.promises.readdir(folderPath);

        const cdsFiles = files.filter((file) => file.endsWith(".cds"));
        let schema = "namespace test;\n";

        for (const file of cdsFiles) {
            const filePath = path.join(folderPath, file);
            const data = await fs.promises.readFile(filePath, "utf8");
            schema += `\n${data}\n`;
        }

        await fs.promises.writeFile(path.join(folderPath, "schema.cds"), schema);
        console.log("Files merged into schema.cds");
    } catch (error) {
        console.error(error);
    }
}

const deleteFiles = () => {
    fs.readdirSync(dbFolder).forEach((file) => {
        if (file !== "schema.cds") {
            fs.unlinkSync(path.join(dbFolder, file));
        }
    });
};

module.exports = async function createCdsSchema() {    
    fs.readdirSync(dataFolder).forEach((file) => {
        const filePath = path.join(dataFolder, file);
        const data = JSON.parse(fs.readFileSync(filePath));
        const filename = path.parse(file).name;
      
        createCdsFiles(filename, data[0]);
      });
    
    await readCdsFiles();

    deleteFiles();
}

