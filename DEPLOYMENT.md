# Webapp Deployment Guide

This guide covers deployment of the embedding-fusion webapp using Docker.

## Prerequisites

- Docker 20.10 or higher
- Docker Compose 1.29 or higher (optional, for compose deployment)

## Quick Start

### Build and run with Docker

```bash
# Build the image
docker build -t embedding-fusion-webapp .

# Run the container
docker run -d -p 4033:80 --name embedding-fusion-webapp embedding-fusion-webapp

# Access the webapp at http://localhost:4033
```

### Using Docker Compose

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Access the webapp at http://localhost:4033
```

## Build Options

### Development Build
For development with hot reload:
```bash
docker run -d -p 5173:5173 -v $(pwd):/app -w /app node:18-alpine npm run dev
```

### Production Build
The default Dockerfile creates an optimized production build:
- Multi-stage build for minimal image size (~25MB)
- Nginx for efficient static file serving
- Gzip compression enabled
- Security headers configured
- Health checks included

## Configuration

### Port Mapping
Change the host port by modifying the `-p` flag or `docker-compose.yml`:
```bash
docker run -d -p 4033:80 embedding-fusion-webapp
```

### API Backend
If you have a backend API service:

1. Uncomment the backend service in `docker-compose.yml`
2. Update the backend image name
3. The nginx config already proxies `/api` requests to `http://backend:5000`

### Custom Nginx Configuration
Edit `nginx.conf` to customize:
- Cache headers
- Security policies
- API proxy settings
- Custom error pages

## Deployment to Cloud

### AWS ECS
```bash
# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URL
docker tag embedding-fusion-webapp:latest YOUR_ECR_URL/embedding-fusion-webapp:latest
docker push YOUR_ECR_URL/embedding-fusion-webapp:latest
```

### Google Cloud Run
```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/embedding-fusion-webapp

# Deploy
gcloud run deploy embedding-fusion-webapp \
  --image gcr.io/PROJECT_ID/embedding-fusion-webapp \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### DigitalOcean App Platform
```bash
# Push to DigitalOcean Container Registry
doctl registry login
docker tag embedding-fusion-webapp:latest registry.digitalocean.com/YOUR_REGISTRY/embedding-fusion-webapp:latest
docker push registry.digitalocean.com/YOUR_REGISTRY/embedding-fusion-webapp:latest
```

### Kubernetes
Create a deployment:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: embedding-fusion-webapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: embedding-fusion-webapp:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  selector:
    app: webapp
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

## Health Checks

The container includes a health check that pings the root URL every 30 seconds:

```bash
# Check container health
docker ps

# View health check logs
docker inspect --format='{{json .State.Health}}' embedding-fusion-webapp
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs embedding-fusion-webapp

# Inspect container
docker inspect embedding-fusion-webapp
```

### Build fails
```bash
# Build with no cache
docker build --no-cache -t embedding-fusion-webapp .

# Check if .dockerignore is excluding necessary files
cat .dockerignore
```

### Can't access webapp
1. Check if container is running: `docker ps`
2. Check port mapping: `docker port embedding-fusion-webapp`
3. Check firewall rules on host
4. Check nginx logs: `docker logs embedding-fusion-webapp`

### API requests failing
1. Verify backend service is running
2. Check nginx proxy configuration in `nginx.conf`
3. Ensure services are on the same Docker network
4. Check browser console for CORS errors

## Performance Optimization

### Enable CDN
For production, serve static assets through a CDN:
1. Build and push to your CDN origin
2. Update DNS records
3. Configure cache policies

### SSL/TLS
In production, run behind a reverse proxy (nginx, Traefik) or load balancer with SSL:
```bash
# Example with Caddy as reverse proxy
caddy reverse-proxy --from your-domain.com --to localhost:4033
```

### Resource Limits
Set memory and CPU limits:
```bash
docker run -d \
  --memory="512m" \
  --cpus="0.5" \
  -p 4033:80 \
  embedding-fusion-webapp
```

## Monitoring

### Container Stats
```bash
# Real-time stats
docker stats embedding-fusion-webapp

# Logs
docker logs -f embedding-fusion-webapp
```

### Integration with Monitoring Tools
- Prometheus: Add metrics endpoint
- Grafana: Import Docker dashboard
- DataDog: Install DD agent in container
- New Relic: Add browser monitoring script

## Maintenance

### Updating the Application
```bash
# Pull latest code
git pull

# Rebuild image
docker build -t embedding-fusion-webapp .

# Stop old container
docker stop embedding-fusion-webapp
docker rm embedding-fusion-webapp

# Start new container
docker run -d -p 4033:80 --name embedding-fusion-webapp embedding-fusion-webapp
```

### Backup
The webapp is stateless, but you may want to backup:
- JSON data files in `public/`
- Custom configuration files
- Docker images

### Cleanup
```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune
```

## Security Best Practices

1. **Never commit secrets** - Use environment variables or secret management
2. **Regular updates** - Keep base images and dependencies updated
3. **Scan images** - Use `docker scan` or Trivy for vulnerability scanning
4. **Run as non-root** - Consider adding a non-root user in Dockerfile
5. **Network isolation** - Use custom Docker networks
6. **Rate limiting** - Configure in nginx or reverse proxy

## Support

For issues or questions, refer to:
- Main README: `README.md`
- Project repository: [Your repo URL]
- Docker documentation: https://docs.docker.com
