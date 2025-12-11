FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy application files (excluding no_blur.jpg for security)
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY blur.jpg /usr/share/nginx/html/

# Note: no_blur.jpg is NOT copied - it's embedded as base64 in script.js

# Fix permissions
RUN chmod -R 755 /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
