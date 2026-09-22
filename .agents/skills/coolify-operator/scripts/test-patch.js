const CoolifyClient = require('./coolify-cli');
const https = require('https');

async function testDeployEndpoint() {
  const client = new CoolifyClient();
  const uuid = 'd8o8ogw40kcw4s00owow08k8';

  console.log('Testing deploy endpoints for app:', uuid);

  // Test GET /deploy?uuid=d8o8ogw40kcw4s00owow08k8
  try {
    const res = await new Promise((resolve, reject) => {
      const req = https.request(`${client.baseUrl}/deploy?uuid=${uuid}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${client.token}`, 'Accept': 'application/json' }
      }, res => {
        let d = '';
        res.on('data', chunk => d += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: d }));
      });
      req.on('error', reject);
      req.end();
    });
    console.log('GET /deploy?uuid=... result:', res);
  } catch (err) {
    console.error('GET /deploy error:', err.message);
  }

  // Test POST /deploy?uuid=d8o8ogw40kcw4s00owow08k8
  try {
    const res = await new Promise((resolve, reject) => {
      const req = https.request(`${client.baseUrl}/deploy?uuid=${uuid}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${client.token}`, 'Accept': 'application/json' }
      }, res => {
        let d = '';
        res.on('data', chunk => d += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: d }));
      });
      req.on('error', reject);
      req.end();
    });
    console.log('POST /deploy?uuid=... result:', res);
  } catch (err) {
    console.error('POST /deploy error:', err.message);
  }
}

testDeployEndpoint();
