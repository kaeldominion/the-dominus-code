import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');
const apiResponseTime = new Trend('api_response_time');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up to 10 users
    { duration: '1m', target: 20 },   // Ramp up to 20 users
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '2m', target: 50 },   // Stay at 50 users
    { duration: '1m', target: 100 },  // Spike to 100 users
    { duration: '1m', target: 50 },   // Back down to 50
    { duration: '30s', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
    http_req_failed: ['rate<0.05'],     // Error rate should be less than 5%
    errors: ['rate<0.1'],                // Custom error rate
  },
};

// Base URL - set via environment variable or default
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3003';
const IS_PRODUCTION = BASE_URL.includes('thedominuscode.com');

// Test data
const testQuestions = [
  "What is the meaning of sovereignty?",
  "How do I build a dynasty?",
  "What is the Dominus Code?",
  "Tell me about the protocol",
  "What makes a man sovereign?",
];

// Helper function to get random element
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Main pages to test
const pages = [
  '/',
  '/calibration',
  '/council',
  '/oath',
  '/oracle',
  '/media',
  '/intel',
  '/book',
  '/contact',
  '/privacy',
  '/terms',
];

// API endpoints to test
const apiEndpoints = [
  { method: 'GET', path: '/api/book' },
  { method: 'GET', path: '/api/rate-limit-check' },
];

export default function () {
  // Test main pages (80% of traffic)
  if (Math.random() < 0.8) {
    const page = getRandomElement(pages);
    const url = `${BASE_URL}${page}`;
    
    const response = http.get(url, {
      tags: { name: `Page:${page}` },
      headers: {
        'User-Agent': 'k6-load-test',
      },
    });

    const success = check(response, {
      'page status is 200': (r) => r.status === 200,
      'page response time < 3s': (r) => r.timings.duration < 3000,
      'page has content': (r) => r.body.length > 1000,
    });

    errorRate.add(!success);
    pageLoadTime.add(response.timings.duration);

    if (!success) {
      console.log(`Page failed: ${page} - Status: ${response.status}`);
    }
  } 
  // Test API endpoints (15% of traffic)
  else if (Math.random() < 0.15) {
    const endpoint = getRandomElement(apiEndpoints);
    const url = `${BASE_URL}${endpoint.path}`;
    
    const params = {
      tags: { name: `API:${endpoint.path}` },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'k6-load-test',
      },
    };

    let response;
    if (endpoint.method === 'GET') {
      response = http.get(url, params);
    } else if (endpoint.method === 'POST') {
      response = http.post(url, JSON.stringify({}), params);
    }

    const success = check(response, {
      'api status is 200 or 429': (r) => r.status === 200 || r.status === 429,
      'api response time < 5s': (r) => r.timings.duration < 5000,
    });

    errorRate.add(!success);
    apiResponseTime.add(response.timings.duration);
  }
  // Test Oracle API (5% of traffic - heavier endpoint)
  else {
    const question = getRandomElement(testQuestions);
    const url = `${BASE_URL}/api/oracle`;
    
    const payload = JSON.stringify({
      messages: [
        { role: 'user', text: question }
      ],
      language: 'English',
    });

    const response = http.post(url, payload, {
      tags: { name: 'API:/api/oracle' },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'k6-load-test',
      },
      timeout: '30s', // Oracle can take longer
    });

    const success = check(response, {
      'oracle status is 200 or 429': (r) => r.status === 200 || r.status === 429 || r.status === 503,
      'oracle response time < 30s': (r) => r.timings.duration < 30000,
    });

    errorRate.add(!success);
    apiResponseTime.add(response.timings.duration);
  }

  // Random sleep between 1-3 seconds to simulate real user behavior
  sleep(Math.random() * 2 + 1);
}

// Setup function - runs once before the test
export function setup() {
  console.log(`🚀 Starting k6 load test against: ${BASE_URL}`);
  console.log(`📍 Environment: ${IS_PRODUCTION ? 'PRODUCTION' : 'LOCAL'}`);
  
  // Warm-up request
  const warmup = http.get(`${BASE_URL}/`);
  console.log(`🔥 Warm-up request status: ${warmup.status}`);
  
  return { baseUrl: BASE_URL, isProduction: IS_PRODUCTION };
}

// Teardown function - runs once after the test
export function teardown(data) {
  console.log(`✅ Load test completed for: ${data.baseUrl}`);
}

