#!/usr/bin/env node

/**
 * Test script for Do512 Event Scraper
 * Usage: node test-scraper.js [webhook-url] [event-url]
 */

const https = require('https');
const http = require('http');

const webhookUrl = process.argv[2] || 'https://brownnoise.app.n8n.cloud/webhook-test/scrape-event';
const eventUrl = process.argv[3] || 'https://do512.com/events/2025/12/14/billy-strings-night-two-tickets';

const url = new URL(webhookUrl);
const isHttps = url.protocol === 'https:';
const client = isHttps ? https : http;

const postData = JSON.stringify({
  url: eventUrl
});

const options = {
  hostname: url.hostname,
  port: url.port || (isHttps ? 443 : 80),
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Testing Do512 Event Scraper');
console.log('Webhook URL:', webhookUrl);
console.log('Event URL:', eventUrl);
console.log('');

const req = client.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();

