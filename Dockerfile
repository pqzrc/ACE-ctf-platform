FROM ctfd/ctfd:3.8.1

# Switch to root temporarily for installations
USER root

# Install additional dependencies with pinned versions
RUN pip install --no-cache-dir \
    requests==2.31.0 \
    APScheduler==3.10.4 \
    PyJWT==2.8.0

# Copy custom plugins
COPY --chown=ctfd:ctfd plugins/ /opt/CTFd/CTFd/plugins/

# Set working directory
WORKDIR /opt/CTFd

# Switch back to ctfd user (non-root)
USER ctfd

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
    CMD wget --quiet --tries=1 --spider http://localhost:8000/healthcheck || exit 1

# Use default CTFd entrypoint
