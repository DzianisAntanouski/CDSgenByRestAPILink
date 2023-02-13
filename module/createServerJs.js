const fs = require('fs');

const createServerJs = () => {
  return new Promise((resolve, reject) => {
    const code = `
  const cds = require("@sap/cds");
  const proxy = require("@sap/cds-odata-v2-adapter-proxy");
  
  cds.on("bootstrap", async (app) => {
  
      app.use(proxy());
      
  })
  
  module.exports = cds.server;
    `;

    fs.writeFile('./srv/server.js', code, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

module.exports = createServerJs;