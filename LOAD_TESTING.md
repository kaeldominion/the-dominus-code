# Load Testing with k6

This project uses [k6](https://k6.io) for load testing both localhost and production environments.

## Quick Start

### Install k6 (if not already installed)

**macOS:**
```bash
brew install k6
```

**Other platforms:**
See [k6 installation guide](https://k6.io/docs/getting-started/installation/)

### Run Tests

**Test Localhost (default: http://localhost:3003):**
```bash
npm run test:load:local
```

**Test Production:**
```bash
npm run test:load:prod
```

**Quick 30-second test:**
```bash
npm run test:load:quick
```

**Custom URL:**
```bash
BASE_URL=http://localhost:3003 k6 run k6-load-test.js
```

## Test Configuration

The load test script (`k6-load-test.js`) includes:

### Load Pattern
- **Ramp-up:** 0 → 10 → 20 → 50 users over 2.5 minutes
- **Sustained:** 50 users for 2 minutes
- **Spike:** Up to 100 users for 1 minute
- **Ramp-down:** Back to 0 over 30 seconds
- **Total duration:** ~7 minutes

### Traffic Distribution
- **80%** - Main pages (home, calibration, council, oath, etc.)
- **15%** - Lightweight API endpoints (book, rate-limit-check)
- **5%** - Oracle API (heavier endpoint with AI)

### Tested Endpoints

**Pages:**
- `/` (home)
- `/calibration`
- `/council`
- `/oath`
- `/oracle`
- `/media`
- `/intel`
- `/book`
- `/contact`
- `/privacy`
- `/terms`

**API Endpoints:**
- `GET /api/book`
- `GET /api/rate-limit-check`
- `POST /api/oracle` (with test questions)

## Performance Thresholds

The test expects:
- **95% of requests** should complete in under 2 seconds
- **Error rate** should be less than 5%
- **Page load time** should be under 3 seconds
- **API response time** should be under 5 seconds
- **Oracle responses** should be under 30 seconds

## Metrics Tracked

- `http_req_duration` - Request duration (p50, p95, p99)
- `http_req_failed` - Failed request rate
- `errors` - Custom error rate
- `page_load_time` - Custom metric for page loads
- `api_response_time` - Custom metric for API calls

## Advanced Usage

### Custom Duration and Users
```bash
k6 run --duration 5m --vus 100 k6-load-test.js
```

### Save Results to JSON
```bash
k6 run --out json=results.json k6-load-test.js
```

### Cloud Results (k6 Cloud)
```bash
k6 cloud k6-load-test.js
```

### Custom Thresholds
```bash
k6 run --thresholds http_req_duration=p\(95\)\<1000 k6-load-test.js
```

### Test Specific Endpoint
Modify `k6-load-test.js` to focus on specific endpoints or adjust traffic distribution.

## Interpreting Results

### Good Performance ✅
- p95 response time < 2s
- Error rate < 5%
- No 500 errors
- Consistent response times

### Issues to Watch For ⚠️
- **429 errors** - Rate limiting is working (expected under heavy load)
- **500 errors** - Server errors (investigate)
- **Slow responses** - Database connection issues or resource constraints
- **High error rate** - Application may be overloaded

### Production vs Localhost

**Production (Vercel):**
- Serverless functions scale automatically
- May see cold starts on first requests
- Rate limiting may be more aggressive

**Localhost:**
- Limited by local machine resources
- No auto-scaling
- Good for testing before deployment

## Tips

1. **Start with quick test** - Use `npm run test:load:quick` first
2. **Monitor your database** - Watch Neon dashboard during tests
3. **Check Vercel logs** - Monitor function logs during production tests
4. **Test during off-peak** - Avoid impacting real users
5. **Gradual ramp-up** - The script already includes gradual ramp-up to avoid sudden spikes

## Troubleshooting

**k6 not found:**
```bash
brew install k6
```

**Connection refused (localhost):**
- Make sure dev server is running: `npm run dev`
- Check port: default is 3003

**High error rates:**
- Check if database is accessible
- Verify environment variables are set
- Check rate limiting configuration

**Slow responses:**
- Monitor database connection pool
- Check API rate limits (Gemini, etc.)
- Review serverless function logs

