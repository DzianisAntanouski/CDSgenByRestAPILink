const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

module.exports = async function checkAndInstallCdsPackage() {
  try {
    execSync('npm list @sap/cds', {stdio: 'ignore'});
    console.log('@sap/cds package is already installed');
  } catch (error) {
    console.log('@sap/cds package is not installed, installing...');
    exec('npm i @sap/cds', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }
}
