const fs = require('fs');

const createMySrvJsFile = () => {
  return new Promise((resolve, reject) => {
    const code = `
const cds = require('@sap/cds');
const fetch = require('node-fetch');

module.exports = async function mySrv(srv) {

    // Register event handlers with instances of cds.Service
    srv.on('READ', async (req) => {
    const entityName = req.target.name.replace("mySrv.", "");

    // Call external REST API
    const response = await fetch(\`https://jsonplaceholder.typicode.com/\${entityName}\`);
    const responseData = await response.json();

    // Return response data as result of the READ operation
    req.reply(responseData);
    });

    srv.on('CREATE', async (req) => {
    const entityName = req.target.name.replace("mySrv.", "");

    // Call external REST API to create new entity
    const response = await fetch(\`https://jsonplaceholder.typicode.com/\${entityName}\`, {
        method: 'POST',
        body: JSON.stringify(req.data),
        headers: { 'Content-Type': 'application/json' }
    });
    const responseData = await response.json();

    // Return response data as result of the CREATE operation
    req.reply(responseData);
    });

    srv.on('UPDATE', async (req) => {
    const entityName = req.target.name.replace("mySrv.", "");

    // Call external REST API to update existing entity
    const response = await fetch(\`https://jsonplaceholder.typicode.com/\${entityName}/\${req.data.id}\`, {
        method: 'PUT',
        body: JSON.stringify(req.data),
        headers: { 'Content-Type': 'application/json' }
    });
    const responseData = await response.json();

    // Return response data as result of the UPDATE operation
    req.reply(responseData);
    });

    srv.on('DELETE', async (req) => {
    const entityName = req.target.name.replace("mySrv.", "");

    // Call external REST API to delete existing entity
    const response = await fetch(\`https://jsonplaceholder.typicode.com/\${entityName}/\${req.data.id}\`, {
        method: 'DELETE'
    });
    const responseData = await response.json();

    // Return response data as result of the DELETE operation
    req.reply(responseData);
    });
};    
    `;

    fs.writeFile('./srv/mySrv.js', code, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

module.exports = createMySrvJsFile;