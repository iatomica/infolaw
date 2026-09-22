const https = require('https');
const conf = require('../../../../coolify_config.json');

const depUuid = process.argv[2] || 't4wooo0wks8gs0sowcw4sscw';

async function check() {
  console.log('Monitoring deployment:', depUuid);
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 6000));
    try {
      const data = await new Promise((resolve, reject) => {
        const req = https.request(`https://devops.iatomica.com/api/v1/deployments/${depUuid}`, {
          headers: { 'Authorization': 'Bearer ' + conf.coolify_token, 'Accept': 'application/json' }
        }, res => {
          let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(d));
        });
        req.on('error', reject);
        req.end();
      });

      const json = JSON.parse(data);
      console.log(`[${i+1}] Deployment Status: ${json.status}`);
      if (json.status === 'finished') {
        console.log('SUCCESS: Deployment successfully finished!');
        process.exit(0);
      } else if (json.status === 'failed') {
        console.log('FAILED: Deployment failed. Tail of build logs:');
        let logs = [];
        try {
          logs = typeof json.logs === 'string' ? JSON.parse(json.logs) : json.logs;
        } catch (e) {
          logs = [{ output: json.logs }];
        }
        if (Array.isArray(logs)) {
          logs.slice(-15).forEach(l => console.log(l.output || l));
        } else {
          console.log(logs);
        }
        process.exit(1);
      }
    } catch (err) {
      console.log(`[${i+1}] Error querying deployment:`, err.message);
    }
  }
  console.log('Timeout waiting for deployment');
  process.exit(2);
}

check();
