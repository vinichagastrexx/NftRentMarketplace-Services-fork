const cron = require('node-cron');
const { exec } = require('child_process');

function refreshToken() {
  exec('sxtcli authenticate login', (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
}

// Schedule the refreshToken function to run every 25 minutes
cron.schedule('*/25 * * * *', refreshToken);
