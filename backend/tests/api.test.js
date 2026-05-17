/**
 * Basic API tests - run after server is NOT running on same port
 * Or test against running server with: node tests/api.test.js
 */
require('dotenv').config();
const http = require('http');

const BASE = `http://localhost:${process.env.PORT || 5000}`;
let token = '';

const request = (method, path, body = null, auth = false) =>
  new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (auth && token) options.headers.Authorization = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data || '{}') });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });

const runTests = async () => {
  console.log('=== Petrol Pump API Tests ===\n');
  let passed = 0;
  let failed = 0;

  const assert = (name, condition) => {
    if (condition) {
      console.log(`✓ ${name}`);
      passed++;
    } else {
      console.log(`✗ ${name}`);
      failed++;
    }
  };

  try {
    const health = await request('GET', '/health');
    assert('Health check', health.status === 200 && health.body.success);

    const login = await request('POST', '/api/auth/login', {
      email: 'admin@petrolpump.com',
      password: 'admin123',
    });
    assert('Login', login.status === 200 && login.body.data?.token);
    token = login.body.data?.token || '';

    const profile = await request('GET', '/api/auth/me', null, true);
    assert('Get profile', profile.status === 200);

    const fuels = await request('GET', '/api/fuels', null, true);
    assert('Get fuels', fuels.status === 200);

    const dashboard = await request('GET', '/api/reports/dashboard', null, true);
    assert('Dashboard', dashboard.status === 200);

    console.log(`\nResults: ${passed} passed, ${failed} failed`);
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Tests failed - is the server running?', err.message);
    process.exit(1);
  }
};

runTests();
