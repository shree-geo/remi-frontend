Docker build and run

Build the image:

```bash
docker build -t remi-app:latest .
```

Run the container (exposes port 3000):

```bash
docker run -p 3000:3000 --env NODE_ENV=production remi-app:latest
```

Notes:
- The container uses `pnpm` via Corepack. If your CI or environment needs a different pnpm version, adjust the Dockerfile.
- Middleware (language proxy) is included; ensure you build with `pnpm build` (Dockerfile runs it in the builder stage).