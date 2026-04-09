# Base image Python
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy toàn bộ project vào container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Expose port (Railway sẽ override bằng $PORT)
EXPOSE 8000

# Run app (QUAN TRỌNG: dùng $PORT)
CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]